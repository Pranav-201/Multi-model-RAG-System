import readline from "readline";
import { askQuestion } from "./askQuestion.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🤖 RAG Chat Started!");
console.log("Type 'exit' to quit.\n");

function chat() {
  rl.question("You: ", async (question) => {
    if (question.toLowerCase() === "exit") {
      console.log("👋 Goodbye!");
      rl.close();
      return;
    }

    const answer = await askQuestion(question);
    console.log("\nBot:", answer);
    console.log();

    chat(); // ask next question
  });
}

chat();