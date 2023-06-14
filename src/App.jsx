import React, { useState, useEffect } from 'react';

const App = () => {
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isResultVisible, setIsResultVisible] = useState(false);


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('/src/quizData.json');
        const data = await response.json();
        setQuiz(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizData();
  }, []);

  const checkAnswer = (selectedAnswerIndex) => {
    const currentQuiz = quiz[currentIndex];

    if (selectedAnswerIndex === currentQuiz.correct) {
      setScore(score + 1);
    }
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }else {
      setIsResultVisible(true);
    }

  };

  if (quiz.length === 0) {
    return <p>Loading...</p>;
  }

  if (!isResultVisible) {
    return (
      <div>
        <p>{quiz[currentIndex].question}</p>
        {quiz[currentIndex].answers.map((answer, index) => (
          <div key={index}>
            <button
              className={selectedAnswer === index ? 'selected' : ''} // 선택된 버튼에 클래스 추가
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </button>
          </div>
        ))}
        <br/>
        <button disabled={selectedAnswer === null} onClick={() => checkAnswer(selectedAnswer)}>
          다음 문제로
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>퀴즈 결과</h2>
      <p>점수: {score}/10</p>
    </div>
  );
};

export default App;
