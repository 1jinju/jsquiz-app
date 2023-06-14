import React from 'react';

export const Result = ({ score, quizData, incorrectList, retryQuiz, initQuiz }) => {
  if (incorrectList.length > 0) {
    return (
      <div className="result-container">
        <p className="result-score">점수 {score}/{quizData.length}</p>
        <div>
          <h3>틀린 문제</h3>
          {incorrectList.map((incorrect) => (
            <div key={incorrect} className="result-answer">
              <p>{quizData[incorrect].question}</p>
            </div>
          ))}
        </div>
        <div className="result-button">
          <button onClick={retryQuiz}>틀린 문제 다시 풀기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container">
      {score === quizData.length && <p className="result-score">점수 {score}/{quizData.length}</p>}
      <p>모든 문제를 맞혔습니다!</p>
      <div className="result-button">
        <button onClick={initQuiz}>처음부터 다시 풀기</button>
      </div>
    </div>
  );
};
