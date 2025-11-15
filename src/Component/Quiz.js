import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import "./Quiz.css";

const Quiz = () => {
  const questions = [
    { question: "What is React?", options: ["Library", "Language", "Framework", "Tool"], answer: "Library" },
    { question: "HTML stands for?", options: ["HighText Machine Language", "Hypertext Markup Language", "HyperText Makeup Language", "None"], answer: "Hypertext Markup Language" },
    { question: "CSS is used for?", options: ["Styling", "Structure", "Database", "API"], answer: "Styling" },
    { question: "React uses?", options: ["Virtual DOM", "Real DOM", "Shadow DOM", "None"], answer: "Virtual DOM" },
    { question: "Which tag creates a paragraph?", options: ["<p>", "<h1>", "<div>", "<span>"], answer: "<p>" },
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Central Style System", "Color Style Sheet", "None"], answer: "Cascading Style Sheets" },
    { question: "useState is a?", options: ["Hook", "Component", "Function", "Variable"], answer: "Hook" },
    { question: "Which is NOT a CSS unit?", options: ["px", "em", "kg", "%"], answer: "kg" },
    { question: "React created by?", options: ["Google", "Facebook", "Microsoft", "Twitter"], answer: "Facebook" },
    { question: "Which tag is self closing?", options: ["<img>", "<p>", "<h1>", "<div>"], answer: "<img>" },
    { question: "CSS Flexbox used for?", options: ["Alignment", "Database", "API", "Routing"], answer: "Alignment" },
    { question: "React files extension?", options: [".js", ".jsx", ".react", ".rjs"], answer: ".jsx" },
    { question: "HTML is?", options: ["Programming Language", "Markup Language", "Styling Language", "None"], answer: "Markup Language" },
    { question: "Which hook runs once?", options: ["useEffect", "useState", "useLoop", "useCall"], answer: "useEffect" },
    { question: "CSS Grid used for?", options: ["2D Layout", "3D Layout", "Audio", "Video"], answer: "2D Layout" },
    { question: "React component returns?", options: ["HTML", "JSX", "JSON", "XML"], answer: "JSX" },
    { question: "Which tag creates a link?", options: ["<a>", "<p>", "<link>", "<nav>"], answer: "<a>" },
    { question: "Which is React Router?", options: ["react-router-dom", "routerJS", "nav-react", "route-react"], answer: "react-router-dom" },
    { question: "CSS for background color?", options: ["bg-color", "background-color", "color-bg", "bg"], answer: "background-color" },
    { question: "React renders UI using?", options: ["Components", "Tables", "Frames", "Blocks"], answer: "Components" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(600); // 10 min timer
  const [showResult, setShowResult] = useState(false);

  // TOTAL exam timer
  useEffect(() => {
    if (timer === 0) {
      setShowResult(true);
      return;
    }
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleAnswer = (option) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: option });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const submitExam = () => setShowResult(true);

  const score = questions.reduce((acc, q, i) =>
    acc + (userAnswers[i] === q.answer ? 1 : 0), 0
  );

  const formatTime = (t) => {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="result-box">
        <h1>Exam Completed 🎉</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <h3>Total Time Left: {formatTime(timer)}</h3>
      <h4>Question {currentIndex + 1} / {questions.length}</h4>

      <QuestionList
        question={questions[currentIndex].question}
        options={questions[currentIndex].options}
        selectedOption={userAnswers[currentIndex]}
        handleAnswer={handleAnswer}
      />

      <div className="btn-box">
        <button onClick={prevQuestion} disabled={currentIndex === 0}>Previous</button>
        <button onClick={nextQuestion} disabled={currentIndex === questions.length - 1}>Next</button>
        <button onClick={submitExam}>Submit</button>
      </div>

    </div>
  );
};

export default Quiz;
