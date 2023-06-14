import React from 'react';

export const Quiz = ({ currentIndex, quizData, selectedAnswer, setSelectedAnswer, checkAnswer }) => {
  return (
    <div>
      <p className="quiz-number">문제 {currentIndex + 1}/{quizData.length}</p>
      <h3>{quizData[currentIndex].question}</h3>
      <div className="quiz-options">
        {quizData[currentIndex].answers.map((answer, index) => (
          <div className="quiz-option" key={index}>
            <button
              className={selectedAnswer === index ? 'selected' : ''}
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </button>
          </div>
        ))}
      </div>
      <div className="quiz-button">
        <button disabled={selectedAnswer === null} onClick={() => checkAnswer(selectedAnswer)}>
          다음 문제
        </button>
      </div>
    </div>
  );
};