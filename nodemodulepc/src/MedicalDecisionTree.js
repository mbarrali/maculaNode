import React, { useState } from 'react';

import './MedicalDecisionTree.css';

  const MedicalDecisionTree = ({ title, questionsData, diagnosesData }) => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [possibleDiagnoses, setPossibleDiagnoses] = useState(diagnosesData);



  const currentQuestionData = questionsData[questionIndex - 1];

  const handleOptionClick = (nextQuestionIndex, answer) => {
    setQuestionIndex(nextQuestionIndex);
    setAnswers([...answers, { question: currentQuestionData.question, answer }]);
  
    // Filter possible diagnoses based on answer
    const filteredDiagnoses = possibleDiagnoses.filter((diagnosis) => {
      const currentCriteria = currentQuestionData.criteria;
      if (currentCriteria in diagnosis && diagnosis[currentCriteria].includes(answer)) {
        return true;
      }
      return false;
    });
  
    // Update possibleDiagnoses only if the current question index is less than the length of questionsData
    if (questionIndex < questionsData.length) {
      setPossibleDiagnoses(filteredDiagnoses);
    }
  };
  
  

  return (
    <div className="container">
      {currentQuestionData ? (
        <>
          <h1 className="title">{title}</h1>
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
        </>
      ) : (
        <p>Fin du questionnaire.</p>
      )}
    

      {possibleDiagnoses.length > 0 && (
        <div>
          <h2>Diagnostiques possibles</h2>
          <ul>
            {possibleDiagnoses.map((diagnosis, index) => (
              <li key={index}>{diagnosis.diagnosis}</li>
            ))}
          </ul>
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

export default MedicalDecisionTree;
