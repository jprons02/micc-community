import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { LoginContext } from "../context/loginContext";
import { SetLoginContext } from "../context/loginContext";

// material-ui
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Login: React.FC = () => {
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
          Log in
        </Typography>
      <LoginForm />
      </Box>
      </Paper>
    </Container>
  );
};

export default Login;

