import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Paper } from '@mui/material';

const defaultQuestion = () => ({
  questionText: '',
  choices: ['', '', '', ''],
  correctAnswers: [false, false, false, false],
});

const QuizCreatorPopup = ({ quizData, onClose, setQuizData }) => {
  const [questions, setQuestions] = useState([...quizData, defaultQuestion()]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswers[choiceIndex] = !newQuestions[questionIndex].correctAnswers[choiceIndex];
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, defaultQuestion()]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    if (newQuestions.length > 1) {
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    } else {
      alert('You must have at least one question.');
    }
  };

  const handleSaveQuiz = () => {
    setQuizData(questions);
    onClose();
  };

  return (
    <Paper elevation={3} className="p-6 rounded-lg bg-white max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Create Your Quiz</h2>
      <form>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-8">
            <TextField
              label={`Question ${qIndex + 1}`}
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className="mb-2"
            />
            {question.choices.map((choice, cIndex) => (
              <div key={cIndex} className="flex items-center mb-2">
                <Checkbox
                  checked={question.correctAnswers[cIndex]}
                  onChange={() => handleCorrectAnswerChange(qIndex, cIndex)}
                  color="primary"
                  className="mr-2"
                />
                <TextField
                  value={choice}
                  onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                />
              </div>
            ))}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveQuestion(qIndex)}
              className="mt-2"
            >
              Remove Question
            </Button>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Quiz
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default QuizCreatorPopup;
