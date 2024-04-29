import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Card,
  List,
  Grid,
  Button,
  Avatar,
  Divider,
  ListItem,
  Container,
  TextField,
  CardMedia,
  Typography,
  CardContent,
  ListItemText
} from '@mui/material';

import { account } from 'src/_mock/account'; 

const UserPage = () => {
  const [userData, setUserData] = useState({
    name: account.displayName,
    email: account.email,
    profession: 'Software Developer',
    savedJobs: ['Job 1', 'Job 2'],
    appliedJobs: ['Job 3'],
    resumeDrafts: ['Resume 1', 'Resume 2'],
    pdfPreviewUrl: null
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setUserData(prevData => ({ ...prevData, pdfPreviewUrl: fileUrl }));
      }
    },
    accept: 'application/pdf',
    noKeyboard: true
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
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <CardMedia>
              <Avatar src={account.photoURL} sx={{ width: 56, height: 56, marginBottom: 2 }}/>
            </CardMedia>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Resume Builder</Typography>
            <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed gray', padding: 20, marginTop: 10 }}>
              <input {...getInputProps()} />
              <Typography variant="body2">Drag or drop your resume PDF here, or click to select files</Typography>
            </div>
            {userData.pdfPreviewUrl && (
              <object data={userData.pdfPreviewUrl} type="application/pdf" width="100%" height="500px">
                <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={userData.pdfPreviewUrl}>Download PDF</a>.</p>
              </object>
            )}
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
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h6">Saved Jobs</Typography>
                {renderListItems(userData.savedJobs)}
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 2, mt: 2 }}>
                <Typography variant="h6">Applied Jobs</Typography>
                {renderListItems(userData.appliedJobs)}
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 2, mt: 2 }}>
                <Typography variant="h6">Resume Drafts</Typography>
                {renderListItems(userData.resumeDrafts)}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;