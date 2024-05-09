import React, { useState, useEffect } from "react";
import {AnxietyResult} from "../components/QuizResult";
import { handleQuizResults } from "../components/QuizResult";

const AnxietyQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "How often have you felt restless or fidgety?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been unable to concentrate or your mind has wandered?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by trouble falling or staying asleep?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by feeling tired or having low energy?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by feeling worthless or guilty?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by trouble making decisions?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by muscle tension?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by being easily startled?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by feeling afraid that something terrible might happen?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often have you been bothered by having a racing heart?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
  ]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOption, setClickedOption] = useState(-1); // Set to -1 initially to handle when no answer is selected
  const [showResult, setShowResult] = useState(false);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(-1); // Reset the selected option
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    //updateScore(); // Ensure the last question's score is added
    // Calculate the final score based on the selected option
    const finalScore = score + (clickedOption !== -1 ? clickedOption + 1 : 0);
    setScore(finalScore);
    setShowResult(true);
    handleQuizResults("AnxietyQuiz", finalScore);
  };

  const updateScore = () => {
    if (clickedOption !== -1) {
      // Only update the score if an option was selected
      const answerValue = clickedOption + 1; // Ensure clickedOption + 1 is added
      setScore((prevScore) => prevScore + answerValue);
      // console.log(score)
    }
  };

  const handleResetClick = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setClickedOption(-1); // Reset selected option
  };

  return (
    <div className="commonQuiz">
      <div className="container">
        <h2>Anxiety TEST</h2>
        {!showResult ? (
          <div className="Quiz-question-option">
            <h3>{questions[currentQuestion].question}</h3>
            <p>
              {questions[currentQuestion].answers.map(
                (answer, answerIndex) => (
                  <button
                    className={`option-btn ${
                      clickedOption === answerIndex
                        ? "checked"
                        : ""
                    }`}
                    key={answerIndex}
                    onClick={() => setClickedOption(answerIndex)}
                  >
                    {answer}
                  </button>
                )
              )}
            </p>
            <input
              type="button"
              id="next-button"
              value={
                currentQuestion < questions.length - 1
                  ? "Next"
                  : "Submit"
              }
              onClick={changeQuestion}
            />
          </div>
        ) : (
          <div>
            <h2 className="result-heading">Result</h2>
            <h3 className="score">{score}</h3>
            <AnxietyResult score={score} />
            <button
              onClick={handleResetClick}
              id="retake-button"
              className="button"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnxietyQuiz;
