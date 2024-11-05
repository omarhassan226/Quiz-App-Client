import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  TextField,
  Box,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Quiz, useQuizContext } from '../../contexts/QuizContext/QuizContext';
import { styles } from './DueAssignmentCard.styles';
import { MdQuiz } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { MdDateRange } from 'react-icons/md';

const QuizComponent: React.FC = () => {
  const { quizzes, addQuiz, updateQuiz, deleteQuiz, loading, error } = useQuizContext();
  const [newQuiz, setNewQuiz] = useState<Partial<Quiz>>({
    name: '',
    course: '',
    topic: '',
    dueDate: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      import('./Quiz.css').then(() => {
        console.log('Quiz.css loaded');
      });
    }
  }, []);

  const openModal = (quiz?: Quiz) => {
    if (quiz) {
      setIsEditing(true);
      setEditingQuizId(quiz._id);
      setNewQuiz({ name: quiz.name, course: quiz.course, topic: quiz.topic, dueDate: quiz.dueDate });
    } else {
      setIsEditing(false);
      setNewQuiz({ name: '', course: '', topic: '', dueDate: '' });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setEditingQuizId(null);
  };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizToDelete(quizId);
    setConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (quizToDelete) {
      await deleteQuiz(quizToDelete);
    }
    setConfirmationModalOpen(false);
    setQuizToDelete(null);
  };

  const handleSubmit = async () => {
    if (isEditing && editingQuizId) {
      await updateQuiz(editingQuizId, newQuiz as Quiz);
    } else {
      await addQuiz(newQuiz as Omit<Quiz, '_id' | 'createdAt'>);
    }
    closeModal();
  };

  return (
    <Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <div className="quiz-cards">
        {quizzes.map((quiz) => (
          <Card key={quiz._id} variant="outlined" className="quiz-card">
            <CardContent>
              <Box sx={styles.flexContainer}>
                <MdQuiz />
                <Typography variant="h5">{quiz.name}</Typography>
              </Box>
              <Typography color="textSecondary">Course: {quiz.course}</Typography>
              <Typography color="textSecondary">Topic: {quiz.topic}</Typography>
              <Typography color="textSecondary">Due Date: {new Date(quiz.dueDate).toLocaleString()}</Typography>
              <Box sx={{ display: 'flex', width: '100%', gap: '16px', paddingTop: '10px' }}>
                <Button sx={styles.button} variant="contained" onClick={() => openModal(quiz)}>
                  Edit
                </Button>
                <Button sx={styles.button} variant="contained" color="secondary" onClick={() => handleDeleteQuiz(quiz._id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className='button' variant='contained' onClick={() => openModal()}>
        Add New Quiz
      </Button>

      {/* Add New Quiz / Edit Quiz Modal */}
      <Modal open={modalIsOpen} onClose={closeModal}>
        <Box sx={styles.model}>
          <Box sx={styles.flexContainer}>
            {isEditing ? <FaEdit /> : <MdAssignmentAdd />}
            <Typography variant="h6">{isEditing ? 'Edit Quiz' : 'Add New Quiz'}</Typography>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newQuiz.name}
            onChange={(e) => setNewQuiz({ ...newQuiz, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Course"
            value={newQuiz.course}
            onChange={(e) => setNewQuiz({ ...newQuiz, course: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Topic"
            value={newQuiz.topic}
            onChange={(e) => setNewQuiz({ ...newQuiz, topic: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Due Date"
            type="datetime-local"
            value={newQuiz.dueDate}
            onChange={(e) => setNewQuiz({ ...newQuiz, dueDate: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdDateRange style={{ color: '#000' }} />
                </InputAdornment>
              ),
              style: { color: '#000', backgroundColor: '#5d5b5b' },
            }}
          />
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button sx={styles.button} variant="contained" onClick={handleSubmit}>
              {isEditing ? 'Update Quiz' : 'Add Quiz'}
            </Button>
            <Button sx={styles.button} variant="contained" onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
        <Box sx={styles.model}>
          <Typography variant="h6">Are you sure you want to delete this quiz?</Typography>
          <Box sx={{ display: 'flex', gap: '16px', paddingTop: '10px' }}>
            <Button variant="contained" sx={styles.button} color="error" onClick={confirmDelete}>
              Yes, Delete
            </Button>
            <Button variant="contained" sx={styles.button} onClick={() => setConfirmationModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default QuizComponent;
