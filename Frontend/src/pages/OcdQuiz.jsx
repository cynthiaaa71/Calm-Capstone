import {OcdResult} from "../components/QuizResult";
import React, { useState, useEffect } from 'react';
import { handleQuizResults } from "../components/QuizResult"; 

function OcdQuiz() {

  const questions = [
    {
      question: 'Do you have an intense fear of germs or contaminants?',
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: 'Do you feel the need to check things repeatedly, such as locks or switches?',
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: 'Do you have a strict need for things to be orderly or symmetrical?',
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you feel the need to perform repetitive behaviors in order to reduce your anxiety?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    }, {
      question: 'Do your obsessions and compulsions take up a lot of your time?',
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    }, {
      question: "Do you feel like you can't control your obsessions and compulsions?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    }, {
      question: "Do you have thoughts of contamination?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    }, {
      question: "Do you try to resist your obsessions or compulsions, but find it difficult to do so?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    }, {
      question: "Do you have thoughts of symmetry or order?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    }, {
      question: "Do you have thoughts of needing to repeat words or phrases?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    }
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
    handleQuizResults("OcdQuiz", finalScore);
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
        <h2>OCD TEST</h2>
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
            <OcdResult score={score} />
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

export default OcdQuiz;