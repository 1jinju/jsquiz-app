export const Result = ({ score, quizData, incorrectList, retryQuiz, initQuiz }) => {
    if (incorrectList.length > 0) {
      return (
        <div>
          <h2>퀴즈 결과</h2>
          <p>점수: {score}/{quizData.length}</p>
          <div>
            <h3>틀린 문제</h3>
            {incorrectList.map((incorrect) => (
              <div key={incorrect}>
                <p>{quizData[incorrect].question}</p>
              </div>
            ))}
          </div>
          <button onClick={retryQuiz}>틀린 문제 다시 풀기</button>
        </div>
      );
    }
  
    return (
      <div>
        <h2>퀴즈 결과</h2>
        {score === 10 && <p>점수: {score}/10</p>}
        <p>모든 문제를 맞혔습니다!</p>
        <button onClick={initQuiz}>처음부터 다시 풀기</button>
      </div>
    );
};
  