import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          Welcome to Taskify
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
        >
          Jira like, project && task management app
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            component={RouterLink}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
