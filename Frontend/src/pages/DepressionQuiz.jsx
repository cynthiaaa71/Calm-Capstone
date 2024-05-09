import React, { useState, useEffect } from "react";
import {DepressionResult} from "../components/QuizResult";
import { handleQuizResults } from "../components/QuizResult";
import ".././App.css";


const DepressionQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "I have lost interest in activities I used to enjoy.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have difficulty concentrating or making decisions.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have feelings of worthlessness or guilt.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have thoughts of death or suicide.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have changes in my appetite.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have changes in my sleep patterns.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have decreased energy levels.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have difficulty controlling my emotions.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have physical aches and pains.",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "I have withdrawn from social activities.",
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
    handleQuizResults("DepressionQuiz", finalScore);
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
        <h2>Depression TEST</h2>
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
            <DepressionResult score={score} />
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

export default DepressionQuiz;
