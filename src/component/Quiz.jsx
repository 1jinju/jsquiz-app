export const Quiz = ({ currentIndex, quizData, selectedAnswer, setSelectedAnswer, checkAnswer }) => {
    return (
      <div>
        <p>문제 {currentIndex + 1}/{quizData.length}</p>
        <h3>{quizData[currentIndex].question}</h3>
        {quizData[currentIndex].answers.map((answer, index) => (
          <div key={index}>
            <button
              className={selectedAnswer === index ? 'selected' : ''}
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </button>
          </div>
        ))}
        <br />
        <button disabled={selectedAnswer === null} onClick={() => checkAnswer(selectedAnswer)}>
          다음 문제
        </button>
      </div>
    );
};