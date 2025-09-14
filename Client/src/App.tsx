import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { generateCV, setJobLink, setResume, resetForm, type FormState } from './store/formSlice';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobLink, resume, isLoading, error, success } = useSelector(
    (state: RootState) => state.form as FormState
  );

  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (!file) {
      setFileError('Please select a file');
      return;
    }

    if (file.type !== 'application/pdf') {
      setFileError('Please upload a PDF file');
      return;
    }

    dispatch(setResume(file));
  };

  const handleSubmit = async () => {
    if (!jobLink || !resume) {
      return;
    }

    const formData = new FormData();
    formData.append('jobLink', jobLink);
    formData.append('resume', resume);

    dispatch(generateCV(formData));
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight="bold"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#1a237e',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          F**K JOB APPLICATIONS
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          paragraph
          sx={{
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '1.2rem'
          }}
        >
          Have somewhere to apply? We'll make cover letters and resume tips from it.
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="jobLink"
            label="Paste any job posting URL..."
            name="jobLink"
            autoFocus
            value={jobLink}
            onChange={(e) => dispatch(setJobLink(e.target.value))}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ width: '100%', py: 1.5 }}
            >
              Upload Resume (PDF)
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Button>
            {resume && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                Selected file: {resume.name}
              </Typography>
            )}
            {fileError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {fileError}
              </Typography>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!jobLink || !resume || isLoading}
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              bgcolor: 'success.main',
              '&:hover': {
                bgcolor: 'success.dark',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'GENERATE'
            )}
          </Button>

          {error && (
            <Alert severity="error" onClose={() => dispatch(resetForm())}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" onClose={() => dispatch(resetForm())}>
              Your cover letter has been generated successfully!
            </Alert>
          )}
        </Box>
      </Paper>

      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mt: 4 }}
      >
        Currently supporting PDF resumes only.
      </Typography>
    </Container>
  );
}