import React, { useState, useEffect } from 'react';
import { Paper, Button, FormGroup, FormControlLabel, Checkbox, Typography, LinearProgress } from '@mui/material';

const Quiz = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const isAnswerCorrect = (question, selected) => {
    const correctIndices = question.choices
      .map((choice, index) => (choice.correct ? index : null))
      .filter((index) => index !== null);
    return (
      correctIndices.length === selected.length &&
      correctIndices.every((index) => selected.includes(index))
    );
  };

  const handleAnswerChange = (questionIndex, choiceIndex) => {
    const updatedAnswers = selectedAnswers[questionIndex] ? [...selectedAnswers[questionIndex]] : [];
    if (updatedAnswers.includes(choiceIndex)) {
      updatedAnswers.splice(updatedAnswers.indexOf(choiceIndex), 1);
    } else {
      updatedAnswers.push(choiceIndex);
    }
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: updatedAnswers,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    quizData.forEach((question, qIndex) => {
      const correctIndices = question.choices
        .map((choice, index) => (choice.correct ? index : null))
        .filter((index) => index !== null);
      const selectedForQuestion = selectedAnswers[qIndex] || [];
      const isCorrect = correctIndices.length === selectedForQuestion.length && 
                        correctIndices.every((index) => selectedForQuestion.includes(index));
      if (isCorrect) {
        newScore += (question.point ? question.point : 1);
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setScore(0);
    setSubmitted(false);
  };

  //const progress = (Object.keys(selectedAnswers).length / quizData.length) * 100;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const answeredQuestions = quizData.filter((_, index) => 
      selectedAnswers[index] && selectedAnswers[index].length > 0
    ).length;
    const newProgress = (answeredQuestions / quizData.length) * 100;
    setProgress(newProgress);
  }, [selectedAnswers]);

  useEffect(() => {
    handleRetry();
  }, [quizData])

  const allQuestionsAnswered = () => {
    return quizData.every((_, index) => selectedAnswers[index] && selectedAnswers[index].length > 0);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '800px', marginLeft: '200px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Take the Quiz</Typography>
      <LinearProgress variant="determinate" value={progress} style={{ marginBottom: '20px' }}/>
      {quizData.map((question, qIndex) => (
        <div key={qIndex} style={{ marginBottom: '15px' }}>
          <Typography variant="h6">{`Question ${qIndex + 1}: ${question.questionText}`}</Typography>
          <FormGroup>
            {question.choices.map((choice, cIndex) => (
              <FormControlLabel
                key={cIndex}
                control={
                  <Checkbox
                    checked={selectedAnswers[qIndex] ? selectedAnswers[qIndex].includes(cIndex) : false}
                    onChange={() => handleAnswerChange(qIndex, cIndex)}
                    disabled={submitted}
                    color="primary"
                  />
                }
                label={choice.text}
              />
            ))}
          </FormGroup>
          {submitted && (
            <Typography variant="body1" style={{ color: isAnswerCorrect(question, selectedAnswers[qIndex] || []) ? 'green' : 'red' }}>
                {isAnswerCorrect(question, selectedAnswers[qIndex] || []) ? 'Correct' : 'Incorrect'}
                {question.explanation && ` - Explanation: ${question.explanation}`}
            </Typography>          
          )}
        </div>
      ))}
      {!submitted && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!allQuestionsAnswered()}  // Disable if not all questions answered
        >
          Submit
        </Button>
      )}
      {submitted && (
        <div>
          <Typography variant="h5" style={{ margin: '20px 0' }}>Your score: {score}</Typography>
          <Button variant="contained" color="secondary" onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default Quiz;
