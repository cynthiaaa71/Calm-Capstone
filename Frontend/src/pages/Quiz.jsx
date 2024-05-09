import React from 'react';
import { Link } from 'react-router-dom';

import quiz1Image from '../images/AnxietyQuiz-min.png';
import quiz2Image from '../images/DepressionQuiz-min.png';
import quiz3Image from '../images/OCDQuiz-min.png';
import quiz4Image from '../images/ADHDQuiz-min.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Quiz = () => {
  return (
    
    <div className="Quiz">
      <h1 >Take A Mental Health Test</h1>
      <center>
          <h3 >
            Please attempt all the questions honestly for accurate results
          </h3>
        </center>
      <div className="container-quizzes">
        <div className="quiz-card">
            <img src={quiz1Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">Anxiety Test</h2>
                <p className="quiz-card-description">Our quiz can help you determine whether you have Anxiety.</p>
                <button className="quiz-card-button"><Link to="/anxiety-quiz">Take Quiz</Link></button>
            </div>
        </div>
        <div className="quiz-card">
            <img src={quiz2Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">Depression Test</h2>
                <p className="quiz-card-description">Our quiz can help you detect early signs or symptoms of Depression</p>
                <button className="quiz-card-button"><Link to="/depression-quiz">Take Quiz</Link></button>
            </div>
        </div>
        <div className="quiz-card">
            <img src={quiz3Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">OCD Test</h2>
                <p className="quiz-card-description"> quiz can help you determine whether you have OCD</p>
                <button className="quiz-card-button"><Link to="/ocd-quiz">Take Quiz</Link></button>
            </div>
        </div>
        <div className="quiz-card">
            <img src={quiz4Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">ADHD Test</h2>
                <p className="quiz-card-description">Our quiz can help you determine whether you
                have ADHD</p>
                <button className="quiz-card-button"><Link to="/adhd-quiz">Take Quiz</Link></button>
            </div>
        </div>
        <div className="quiz-card">
            <img src={quiz4Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">PTSD Test</h2>
                <p className="quiz-card-description">Our quiz can help you determine whether you have PTSD.</p>
                <button className="quiz-card-button"><Link to="/anxiety-quiz">Take Quiz</Link></button>
            </div>
        </div>
        <div className="quiz-card">
            <img src={quiz1Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">Anxiety Quiz</h2>
                <p className="quiz-card-description">Our quiz can help you determine whether you have Anxiety.</p>
                <button className="quiz-card-button"><Link to="/anxiety-quiz">Take Quiz</Link></button>
            </div>
        </div>
        <div className="quiz-card">
            <img src={quiz1Image} className="quiz-card-img"/>
            <div className="quiz-card-body">
              <h2 className="quiz-card-title">Social Anxiety Test</h2>
                <p className="quiz-card-description">Take this Quiz to know if you have any signs of social anxiety.</p>
                <button className="quiz-card-button"><Link to="/anxiety-quiz">Take Quiz</Link></button>
            </div>
        </div>
        
      </div>
      <div className="end-note">
          <marquee>
          NOTE : Please remember that the results of these quizzes are not a substitute
          for professional medical advice. If you have concerns about your mental
          health, consult a healthcare professional.
          </marquee>
        </div>
    </div>
  );
};

export default Quiz;
