import React, { useState, useEffect } from "react";
import {AdhdResult} from "../components/QuizResult";
import { handleQuizResults } from "../components/QuizResult";

const AdhdQuiz = () => {
  const questions = [
    {
      question: "Do you often have trouble paying attention?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Are you easily distracted?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
   {
      question: "Do you have trouble staying organized?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you have trouble following through on instructions?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you fidget or squirm a lot?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you have trouble sitting still?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you have trouble waiting your turn?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you often interrupt others?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you have trouble controlling your impulses?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you often feel restless or have trouble relaxing?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you have trouble paying attention to details?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
  ];

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
    handleQuizResults("AdhdQuiz", finalScore);
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
        <h2>ADHD TEST</h2>
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
            <AdhdResult score={score} />
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

export default AdhdQuiz;
