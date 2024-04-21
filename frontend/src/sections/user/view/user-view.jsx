import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Card,
  List,
  Grid,
  Button,
  Divider,
  ListItem,
  Container,
  TextField,
  Typography,
  ListItemText,
} from '@mui/material';


const UserPage = () => {
  const [userData, setUserData] = useState({
    name: 'Salik Uddin',
    email: 'emaile@example.com',
    profession: 'Software Developer',
    savedJobs: ['Job 1', 'Job 2'],
    appliedJobs: ['Job 3'],
    resumeDrafts: ['Resume 1', 'Resume 2']
  });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: userData.name,
    email: userData.email,
    profession: userData.profession
  });

  const handleEditChange = (prop) => (event) => {
    setEditData({ ...editData, [prop]: event.target.value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setUserData({ ...userData, ...editData });
    }
  };

  const renderListItems = (items) => (
    <List>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText primary={item} />
          </ListItem>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Profile Details</Typography>
            {editMode ? (
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  label="Name"
                  value={editData.name}
                  onChange={handleEditChange('name')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={editData.email}
                  onChange={handleEditChange('email')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Profession"
                  value={editData.profession}
                  onChange={handleEditChange('profession')}
                  margin="normal"
                  fullWidth
                />
              </Box>
            ) : (
              <>
                <Typography>Name: {userData.name}</Typography>
                <Typography>Email: {userData.email}</Typography>
                <Typography>Profession: {userData.profession}</Typography>
              </>
            )}
            <Button variant="contained" onClick={toggleEditMode} sx={{ mt: 2 }}>
              {editMode ? 'Save' : 'Edit'}
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Resume Builder</Typography>
            <Button
              component={RouterLink}
              to="https://profiloverse-resumebuilder.vercel.app/"
              variant="contained"
              sx={{ mt: 1 }}
            >
              Build Your Resume
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Saved Jobs</Typography>
            {renderListItems(userData.savedJobs)}
          </Card>
          <Card sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Applied Jobs</Typography>
            {renderListItems(userData.appliedJobs)}
          </Card>
          <Card sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Resume Drafts</Typography>
            {renderListItems(userData.resumeDrafts)}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;