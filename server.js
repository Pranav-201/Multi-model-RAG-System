import express from "express";
import { askQuestion } from "./askQuestion.js";

const app = express();

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { question } = req.body;

  const answer =
    await askQuestion(question);

  res.json({
    answer,
  });
});

app.listen(3000, () => {
  console.log("Server running...");
});