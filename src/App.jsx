import React, { useState, useEffect } from 'react';
import { Quiz } from './component/Quiz.jsx';
import { Result } from './component/Result.jsx';

const App = () => {
  const [quizData, setQuizData] = useState([]);
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
        setQuizData(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizData();
  }, []);

  const checkAnswer = (selectedAnswerIndex) => {
    const currentQuiz = quizData[currentIndex];

    if (selectedAnswerIndex === currentQuiz.correct) {
      setScore(score + 1);
    } else {
      setIncorrectList([...incorrectList, currentIndex]);
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsResultVisible(true);
    }
  };

  const retryQuiz = () => {
    const incorrectIndexes = incorrectList.map((incorrect) => quizData[incorrect]);
    setQuizData(incorrectIndexes);
    setCurrentIndex(0);
    setScore(0);
    setIsResultVisible(false);
    setIncorrectList([]);
  };

  const initQuiz = () => {
    window.location.reload();
  };
  
  if (quizData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!isResultVisible ? (
        <Quiz
          currentIndex={currentIndex}
          quizData={quizData}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          checkAnswer={checkAnswer}
        />
      ) : (
        <Result
          score={score}
          quizData={quizData}
          incorrectList={incorrectList}
          retryQuiz={retryQuiz}
          initQuiz={initQuiz}
        />
      )}
    </div>
  );

}

export default App;
