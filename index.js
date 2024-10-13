// Boilderplate setup.
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// importing handlers from public folder.
const {
  generateQuestionHandler,
} = require("./public/handlers/generateQuestionHandler");

// Global variables to store the current question and the current streak
let currentQuestion = null;
let currentStreak = 0;

// Instantiating an array to store leaderboard entries
let leaderboard = [];

// GET routes
// Home route, renders the index page with the current streak
app.get("/", (request, response) => {
  response.render("index", { streak: currentStreak });
});

// Quiz route, renders the quiz page with the current question and streak
app.get("/quiz", (request, response) => {
  currentQuestion = generateQuestionHandler();
  response.render("quiz", {
    question: currentQuestion.question,
    streak: currentStreak,
  });
});

// Leaderboards route, renders the leaderboards page with the leaderboard array
app.get("/leaderboards", (request, response) => {
  response.render("leaderboards", { leaderboard: leaderboard });
});

// POST routes
// Quiz route, handles the quiz form submission
app.post("/quiz", (request, response) => {
  // Deconstructing the answer from the request body
  const { answer } = request.body;

  if (answer === currentQuestion.answer) {
    // If the answer is correct, increment the current streak and redirect to the quiz page
    currentStreak++;
    response.redirect("/quiz");
  } else {
    // Add the ended streak to the leaderboard
    // This checks that the streak is greater than 0 before adding it to the leaderboard
    if (currentStreak > 0) {
      leaderboard.push({ streak: currentStreak, date: new Date() });
      leaderboard.sort((a, b) => b.streak - a.streak);
      leaderboard = leaderboard.slice(0, 10);
    }
    // Reset the current streak and redirect to the home page
    currentStreak = 0;
    response.redirect("/");
  }
});

// Boilerplate code to start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
