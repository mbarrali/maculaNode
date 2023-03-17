import React, { useState, useEffect } from 'react';
import questionsData from './questionsData.json';
import diagnosesData from './diagnosesData.json';
import './DouleurThoracique.css';

const DouleurThoracique = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [possibleDiagnoses, setPossibleDiagnoses] = useState(diagnosesData);

  const currentQuestionData = questionsData[questionIndex - 1];

  useEffect(() => {
    // Filter possible diagnoses based on answers
    setPossibleDiagnoses(diagnosesData.filter((diagnosis) => {
      for (let i = 0; i < answers.length; i++) {
        const currentCriteria = answers[i].question;
        if (!(currentCriteria in diagnosis) || !diagnosis[currentCriteria].includes(answers[i].answer)) {
          return false;
        }
      }
      return true;
    }));
  }, [answers]);

  const handleOptionClick = (nextQuestionIndex, answer) => {
    setQuestionIndex(nextQuestionIndex);
    setAnswers([...answers, { question: currentQuestionData.question, answer }]);
  };

  return (
    <div className="container">
      <h1 className="title">Douleur thoracique</h1>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((questionIndex - 1) / questionsData.length) * 100}%` }}
        ></div>
      </div>
      <h2 className="question-number">Question {questionIndex}</h2>
      <h3 className="question">{currentQuestionData.question}</h3>
      <ul className="options">
        {currentQuestionData.options.map((optionData, index) => (
          <li key={index}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => handleOptionClick(optionData.nextQuestion, optionData.option)}
            >
              {optionData.image && <img src={optionData.image} alt="" />}
              {optionData.option}
            </button>
          </li>
        ))}
      </ul>
      {possibleDiagnoses.length === 1 && (
        <div>
          <h2>Réponse</h2>
          <p>{possibleDiagnoses[0].diagnosis}</p>
        </div>
      )}
      {answers.length > 0 && (
        <div>
          <h2>Réponses</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <strong>{answer.question}</strong>: {answer.answer}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(answers))}
          >
            Copier les réponses
          </button>
        </div>
      )}
    </div>
  );
};

export default DouleurThoracique;
