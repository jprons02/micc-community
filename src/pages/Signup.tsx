import React, {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/loginContext";

// material-ui
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material";
import SignupForm from "../components/forms/SignupForm";


const Signup: React.FC = () => {
  const isLoggedIn = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
      if(isLoggedIn) {
        navigate('/home');
      }
  }, [isLoggedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 8 }}>
      <Box
        sx={{
          //marginTop: 2,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      <SignupForm />
      </Box>
      </Paper>
    </Container>
  );
};

export default Signup;

