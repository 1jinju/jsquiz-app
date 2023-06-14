import React, { useState, useEffect } from 'react';

const App = () => {
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [incorrectList, setIncorrectList] = useState([]); // 틀린 문제 리스트

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
    } else {
      setIncorrectList([...incorrectList, currentIndex]);
    }

    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsResultVisible(true);
    }
  };

  const retryQuiz = () => {
    const incorrectIndexes = incorrectList.map((incorrect) => quiz[incorrect]);
    setQuiz(incorrectIndexes);
    setCurrentIndex(0);
    setScore(0);
    setIsResultVisible(false);
    setIncorrectList([]);
  };

  const initQuiz = () => {
    window.location.reload();
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
          다음 문제
        </button>
      </div>
    );
  }

  // 틀린 문제가 있을 때 결과화면
  if (incorrectList.length > 0) {
    return (
      <div>
        <h2>퀴즈 결과</h2>
        <p>점수: {score}/{quiz.length}</p>
        <div>
          <h3>틀린 문제</h3>
          {incorrectList.map((incorrect) => (
            <div key={incorrect}>
              <p>{quiz[incorrect].question}</p>
            </div>
          ))}
        </div>
        <button onClick={retryQuiz}>틀린 문제 다시 풀기</button>
      </div>
    );
  }

  // 틀린 문제가 없을 때 결과화면
  return (
    <div>
      <h2>퀴즈 결과</h2>
      {score === 10 &&
        <p>점수: {score}/10</p>
      }
      <p>모든 문제를 맞혔습니다!</p>
      <button onClick={initQuiz}>처음부터 다시 풀기</button>
    </div>
  );
};

export default App;
