import React from "react";

const QuestionList = ({ question, options, handleAnswer, selectedOption }) => {
  return (
    <div className="question-box">
      <h2>{question}</h2>

      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={selectedOption === option ? "selected" : ""}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
