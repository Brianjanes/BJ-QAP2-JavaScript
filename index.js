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
  try {
    currentQuestion = generateQuestionHandler();
    response.render("quiz", {
      question: currentQuestion.question,
      streak: currentStreak,
    });
  } catch (error) {
    console.error("Error: ", error);
  }
});

// Leaderboards route, renders the leaderboards page with the leaderboard array
app.get("/leaderboards", (request, response) => {
  response.render("leaderboards", { leaderboard: leaderboard });
});

// Quiz complete route, renders the quiz complete page with the final streak
app.get("/quiz-complete", (req, res) => {
  const finalStreak = req.query.streak || 0;
  res.render("quiz-complete", { streak: finalStreak });
});

// POST routes
// Quiz route, handles the quiz form submission
app.post("/quiz", (request, response) => {
  const { answer } = request.body;

  try {
    if (answer === currentQuestion.answer) {
      // If the answer is correct, increment the current streak and redirect to the quiz page
      currentStreak++;
      response.redirect("/quiz");
    } else {
      // Answer is incorrect, quiz is complete
      const finalStreak = currentStreak; // Define finalStreak here

      // Add the ended streak to the leaderboard if it's greater than 0
      if (finalStreak > 0) {
        leaderboard.push({ streak: finalStreak, date: new Date() });
        leaderboard.sort((a, b) => b.streak - a.streak);
        leaderboard = leaderboard.slice(0, 10);
      }

      // Reset the current streak
      currentStreak = 0;

      // Redirect to the quiz-complete page with the final streak
      response.redirect(`/quiz-complete?streak=${finalStreak}`);
    }
  } catch (error) {
    console.error("Error processing answer: ", error);
    response
      .status(500)
      .send("An error occurred while processing your answer.");
  }
});

// Boilerplate code to start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
