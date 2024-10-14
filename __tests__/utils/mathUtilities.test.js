const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("returns an object with question and answer properties", () => {
    const result = getQuestion();
    expect(result).toHaveProperty("question");
    expect(result).toHaveProperty("answer");
  });

  test("question is a string", () => {
    const { question } = getQuestion();
    expect(typeof question).toBe("string");
  });

  test("answer is a string", () => {
    const { answer } = getQuestion();
    expect(typeof answer).toBe("string");
  });

  test("question follows the format 'What is [number] [operation] [number]?'", () => {
    const { question } = getQuestion();
    expect(question).toMatch(/^What is \d+ [\+\-\*\/] \d+\?$/);
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("returns true for correct answer", () => {
    expect(isCorrectAnswer("What is 2 + 2?", "4")).toBe(true);
  });

  test("returns false for incorrect answer", () => {
    expect(isCorrectAnswer("What is 2 + 2?", "5")).toBe(false);
  });

  test("handles addition correctly", () => {
    expect(isCorrectAnswer("What is 5 + 7?", "12")).toBe(true);
  });

  test("handles subtraction correctly", () => {
    expect(isCorrectAnswer("What is 10 - 3?", "7")).toBe(true);
  });

  test("handles multiplication correctly", () => {
    expect(isCorrectAnswer("What is 4 * 6?", "24")).toBe(true);
  });

  test("handles division correctly", () => {
    expect(isCorrectAnswer("What is 15 / 3?", "5")).toBe(true);
  });

  test("is case insensitive", () => {
    expect(isCorrectAnswer("What is 2 + 2?", "Four")).toBe(true);
  });

  test("handles whitespace", () => {
    expect(isCorrectAnswer("What is 2 + 2?", " 4 ")).toBe(true);
  });
});
