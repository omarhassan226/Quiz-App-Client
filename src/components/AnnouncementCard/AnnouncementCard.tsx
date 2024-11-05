import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  TextField,
  Box,
  Grid,
  Avatar,
  CircularProgress,
  Container,
  Fade,
} from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { Announcement, useAnnouncementContext } from '../../contexts/AnnouncementContext/AnnouncementContext';
import { colors } from "../../utils/colors";
import { styles } from '../DueAssignmentCard/DueAssignmentCard.styles';

const AnnouncementComponent: React.FC = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, loading, error } = useAnnouncementContext();

  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    name: '',
    subject: '',
    avatar: '',
    message: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);

  // Open and close the main modal
  const openModal = (announcement?: Announcement) => {
    if (announcement) {
      setIsEditing(true);
      setEditingId(announcement._id);
      setNewAnnouncement({
        name: announcement.name,
        subject: announcement.subject,
        avatar: announcement.avatar,
        message: announcement.message
      });
    } else {
      setIsEditing(false);
      setNewAnnouncement({ name: '', subject: '', avatar: '', message: '' });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setEditingId(null);
  };

  // Handle the delete confirmation modal
  const openConfirmModal = (announcementId: string) => {
    setAnnouncementToDelete(announcementId);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setAnnouncementToDelete(null);
  };

  const handleDelete = () => {
    if (announcementToDelete) {
      deleteAnnouncement(announcementToDelete);
    }
    closeConfirmModal();
  };

  const handleSubmit = async () => {
    if (isEditing && editingId) {
      await updateAnnouncement(editingId, newAnnouncement as Announcement);
    } else {
      await addAnnouncement(newAnnouncement as Omit<Announcement, '_id' | 'createdAt'>);
    }
    closeModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAnnouncement({ ...newAnnouncement, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", p: 2, margin: "0 auto" }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '24px' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.lightBlack }}>
          Announcements
        </Typography>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={() => openModal()}
        >
          Add New Announcement
        </Button>
      </Box>

      <Grid container spacing={2}>
        {announcements.map((announcement) => (
          <Grid item xs={12} sm={12} md={12} key={announcement._id}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                padding: 2,
                gap: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                <Avatar alt={announcement.name} src={announcement.avatar} sx={{ width: 56, height: 56, marginRight: 2 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    width: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={announcement.name}
                >
                  {announcement.name}
                </Typography>
              </Box>
              <CardContent sx={{ flex: 1, borderLeft: { sm: `2px solid #bcbcbc` }, padding: { xs: '0px !important', md: '0 16px !important' } }}>
                <Typography color="textSecondary">Subject: {announcement.subject}</Typography>
                <Typography color="textSecondary">Message: {announcement.message}</Typography>
                <Box sx={{ display: 'flex', marginTop: 1, gap: 1 }}>
                  <Button sx={styles.button} variant="contained" onClick={() => openModal(announcement)}>
                    Edit
                  </Button>
                  <Button sx={styles.button} variant="contained" color="secondary" onClick={() => openConfirmModal(announcement._id)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Modal for Adding/Editing Announcements */}
      <Modal open={modalIsOpen} onClose={closeModal}>
        <Box sx={styles.model}>
          <Box display="flex" alignItems="center" mb={2}>
            {isEditing ? <FaEdit /> : <MdAssignmentAdd />}
            <Typography variant="h6" sx={{ marginLeft: 1 }}>{isEditing ? 'Edit Announcement' : 'Add New Announcement'}</Typography>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newAnnouncement.name}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Subject"
            value={newAnnouncement.subject}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, subject: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            value={newAnnouncement.message}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-upload"
            type="file"
            onChange={handleFileChange}
          />
          <Box sx={{ ...styles.flexContainer, alignItems: 'flex-end' }}>
            <label htmlFor="avatar-upload">
              <Button sx={styles.button} variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {newAnnouncement.avatar && <img src={newAnnouncement.avatar} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '5px', marginTop: '10px' }} />}
          </Box>
          <Box sx={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <Button sx={styles.button} variant="contained" onClick={handleSubmit}>
              {isEditing ? 'Update Announcement' : 'Add Announcement'}
            </Button>
            <Button sx={styles.button} variant="contained" onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Modal for Deletion */}
      <Modal open={confirmModalOpen} onClose={closeConfirmModal} closeAfterTransition>
        <Fade in={confirmModalOpen}>
          <Box sx={styles.model}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Are you sure you want to delete this announcement?
            </Typography>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Button sx={styles.button} variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button sx={styles.button} variant="contained" onClick={closeConfirmModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default AnnouncementComponent;
