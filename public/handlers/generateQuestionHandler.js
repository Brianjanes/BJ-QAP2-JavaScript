function generateQuestionHandler() {
  const operations = ["+", "-", "*", "/"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2, answer;

  switch (operation) {
    case "+":
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * 100);
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * num1);
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 12);
      num2 = Math.floor(Math.random() * 12);
      answer = num1 * num2;
      break;
    case "/":
      num2 = Math.floor(Math.random() * 11) + 1;
      answer = Math.floor(Math.random() * 12);
      num1 = num2 * answer;
      break;
  }

  return {
    question: `What is ${num1} ${operation} ${num2}?`,
    answer: answer.toString(),
  };
}

module.exports = { generateQuestionHandler };
