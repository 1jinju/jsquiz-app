import React, { useState, useEffect } from 'react';

const App = () => {
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const checkAnswer = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (quiz.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{quiz[currentIndex].question}</p>
      {quiz[currentIndex].answers.map((answer, index) => (
        <div key={index}>
          <button
            className={selectedAnswer === index ? 'selected' : ''}
            onClick={() => setSelectedAnswer(index)}
          >
            {answer}
          </button>
        </div>
      ))}
      <button disabled={selectedAnswer === null} onClick={() => checkAnswer()}>
        다음 문제
      </button>
    </div>
  );
};

export default App;
