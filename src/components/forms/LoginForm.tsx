/*
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logInFunction } from "../../services/functions/logInFunction";
import { useSnackbar } from "../../lib/notistack";
import useGoogleRecaptcha from "../../hooks/useReCaptcha";
import { recaptchaTest } from "../../services/functions/recaptchaTest";

// context
import { SetLoginContext } from "../../context/loginContext";
import { SetUserContext } from "../../context/userContext";
import { SetCalendarEventsContext } from "../../context/calendarEvents";

// APIs
import { googleCalendarGetEventsAPI } from "../../services/APIs/googleCalendarGetEvents";

// material-ui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormPaper } from "../../assets/styles/styledComponents/formPaper";

const LoginForm: React.FC = () => {
  let navigate = useNavigate();
  let [error, setError] = useState<string | null>(null);

  const setIsLoggedIn = useContext(SetLoginContext);
  const setUser = useContext(SetUserContext);
  const setCalendarEvents = useContext(SetCalendarEventsContext);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  type formData = {
    email: string;
    tribalId: string;
    password: string;
  };
  const [formData, setFormData] = useState<formData>({
    email: "",
    tribalId: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { token, renderReCAPTCHA } = useGoogleRecaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState<boolean | null>(false);

  useEffect(() => {
    recaptchaTest(token).then((result) => {
      if (result) {
        setRecaptchaResult(true);
      } else {
        setRecaptchaResult(false);
      }
    });
  }, [token]);

  type eventType = React.ChangeEvent<HTMLInputElement>;
  const handleChange = (event: eventType) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const calendarEventsCall = async () => {
    const response = await googleCalendarGetEventsAPI();
    setCalendarEvents(await response);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    // Perform form submission logic or validation here
    const result = await logInFunction(formData);

    if ("message" in result) {
      switch (result.message) {
        case "Success":
          setLoading(false);
          setIsLoggedIn(true);
          setUser(result.data);
          navigate("/home");
          calendarEventsCall();
          enqueueSnackbar("You've successfully logged in!", {
            variant: "success",
          });
          break;
        case "Email not found":
          setError("Email not found");
          setLoading(false);
          enqueueSnackbar("Email not found", { variant: "error" });
          break;
        case "Incorrect password":
          setError("Incorrect password");
          setLoading(false);
          enqueueSnackbar("Incorrect password", { variant: "error" });
          break;
        case "Incorrect tribalId":
          setError("Incorrect tribalId");
          setLoading(false);
          enqueueSnackbar("Incorrect tribalId", { variant: "error" });
          break;
        default:
          setError("Server error");
          setLoading(false);
          console.log("result server error: ", result);
          enqueueSnackbar("Server error, please try again.", {
            variant: "error",
          });
      }
    } else {
      setError("Server error");
      setLoading(false);
      enqueueSnackbar("Server error, please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: "22px" }}>
            Log In
          </FormLabel>
          <TextField
            required
            label="Email"
            name="email"
            value={formData.email.toLowerCase()}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            //label="Tribal ID"
            type="password"
            label="PIN"
            name="tribalId"
            value={formData.tribalId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {renderReCAPTCHA()}
          <div style={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === true || recaptchaResult !== true}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: "hidden" } : {}}>
                Log In
              </span>
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-8px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </div>
          <div style={{ textAlign: "center", margin: "20px 0 15px 0" }}>
            <a href="/forgot-password">Forgot password?</a>
            &nbsp;&nbsp;
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default LoginForm;
//USING ANCHOR IN STEAD OF LINK SO THAT THE RECAPTCHA IFRAME LOADS CORRECTLY}
*/

/* USING THIS 9/18 with recaptcha v2.
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logInFunction } from "../../services/functions/logInFunction";
import { useSnackbar } from "../../lib/notistack";
import useGoogleRecaptcha from "../../hooks/useReCaptcha";
import { recaptchaTest } from "../../services/functions/recaptchaTest";

// context
import { SetLoginContext } from "../../context/loginContext";
import { SetUserContext } from "../../context/userContext";
import { SetCalendarEventsContext } from "../../context/calendarEvents";

// APIs
import { googleCalendarGetEventsAPI } from "../../services/APIs/googleCalendarGetEvents";

// material-ui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormPaper } from "../../assets/styles/styledComponents/formPaper";

const LoginForm: React.FC = () => {
  let navigate = useNavigate();
  let [error, setError] = useState<string | null>(null);

  const setIsLoggedIn = useContext(SetLoginContext);
  const setUser = useContext(SetUserContext);
  const setCalendarEvents = useContext(SetCalendarEventsContext);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  type formData = {
    email: string;
    tribalId: string;
    password: string;
  };
  const [formData, setFormData] = useState<formData>({
    email: "",
    tribalId: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { token, renderReCAPTCHA } = useGoogleRecaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState<boolean | null>(false);

  useEffect(() => {
    recaptchaTest(token).then((result) => {
      if (result) {
        setRecaptchaResult(true);
      } else {
        setRecaptchaResult(false);
      }
    });
  }, [token]);

  type eventType = React.ChangeEvent<HTMLInputElement>;
  const handleChange = (event: eventType) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const calendarEventsCall = async () => {
    const response = await googleCalendarGetEventsAPI();
    setCalendarEvents(await response);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    // Perform form submission logic or validation here
    const result = await logInFunction(formData);

    if ("message" in result) {
      switch (result.message) {
        case "Success":
          setLoading(false);
          setIsLoggedIn(true);
          setUser(result.data);
          navigate("/home");
          calendarEventsCall();
          enqueueSnackbar("You've successfully logged in!", {
            variant: "success",
          });
          break;
        case "Email not found":
          setError("Email not found");
          setLoading(false);
          enqueueSnackbar("Email not found", { variant: "error" });
          break;
        case "Incorrect password":
          setError("Incorrect password");
          setLoading(false);
          enqueueSnackbar("Incorrect password", { variant: "error" });
          break;
        default:
          setError("Server error");
          setLoading(false);
          console.log("result server error: ", result);
          enqueueSnackbar("Server error, please try again.", {
            variant: "error",
          });
      }
    } else {
      setError("Server error");
      setLoading(false);
      enqueueSnackbar("Server error, please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: "22px" }}>
            Log In
          </FormLabel>
          <TextField
            required
            label="Email"
            name="email"
            value={formData.email.toLowerCase()}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {renderReCAPTCHA()}
          <div style={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === true || recaptchaResult !== true}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: "hidden" } : {}}>
                Log In
              </span>
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-8px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </div>
          <div style={{ textAlign: "center", margin: "20px 0 15px 0" }}>
            <a href="/forgot-password">Forgot password?</a>
            &nbsp;&nbsp;
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default LoginForm;
*/

//Using recaptcha v3.
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logInFunction } from "../../services/functions/logInFunction";
import { useSnackbar } from "../../lib/notistack";
import { recaptchaV3API } from "../../services/APIs/recaptchaV3API";

// context
import { SetLoginContext } from "../../context/loginContext";
import { SetUserContext } from "../../context/userContext";
import { SetCalendarEventsContext } from "../../context/calendarEvents";

// APIs
import { googleCalendarGetEventsAPI } from "../../services/APIs/googleCalendarGetEvents";

// material-ui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormPaper } from "../../assets/styles/styledComponents/formPaper";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const setIsLoggedIn = useContext(SetLoginContext);
  const setUser = useContext(SetUserContext);
  const setCalendarEvents = useContext(SetCalendarEventsContext);

  const { enqueueSnackbar } = useSnackbar();

  type formData = {
    email: string;
    tribalId: string;
    password: string;
  };

  const [formData, setFormData] = useState<formData>({
    email: "",
    tribalId: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean | null>(
    false
  );

  type eventType = React.ChangeEvent<HTMLInputElement>;
  const handleChange = (event: eventType) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const calendarEventsCall = async () => {
    const response = await googleCalendarGetEventsAPI();
    setCalendarEvents(await response);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready.");
      setLoading(false);
      enqueueSnackbar("reCAPTCHA not ready. Please try again later.", {
        variant: "error",
      });
      return;
    }

    // Execute reCAPTCHA v3 and get the token
    const recaptchaToken = await executeRecaptcha("login_form");

    if (!recaptchaToken) {
      setError("reCAPTCHA failed.");
      setLoading(false);
      enqueueSnackbar("reCAPTCHA failed. Please try again.", {
        variant: "error",
      });
      return;
    }

    // Validate reCAPTCHA token via the backend
    const recaptchaResult = await recaptchaV3API(recaptchaToken);

    if (recaptchaResult) {
      const result = await logInFunction(formData);

      if ("message" in result) {
        switch (result.message) {
          case "Success":
            setLoading(false);
            setIsLoggedIn(true);
            setUser(result.data);
            navigate("/home");
            calendarEventsCall();
            enqueueSnackbar("You've successfully logged in!", {
              variant: "success",
            });
            break;
          case "Email not found":
            setError("Email not found");
            setLoading(false);
            enqueueSnackbar("Email not found", { variant: "error" });
            break;
          case "Incorrect password":
            setError("Incorrect password");
            setLoading(false);
            enqueueSnackbar("Incorrect password", { variant: "error" });
            break;
          default:
            setError("Server error");
            setLoading(false);
            enqueueSnackbar("Server error, please try again.", {
              variant: "error",
            });
        }
      } else {
        setError("Server error");
        setLoading(false);
        enqueueSnackbar("Server error, please try again.", {
          variant: "error",
        });
      }
    } else {
      setRecaptchaVerified(false);
      setError("reCAPTCHA verification failed.");
      setLoading(false);
      enqueueSnackbar("reCAPTCHA verification failed. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: "22px" }}>
            Log In
          </FormLabel>
          <TextField
            required
            label="Email"
            name="email"
            value={formData.email.toLowerCase()}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div style={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: "hidden" } : {}}>
                Log In
              </span>
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-8px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </div>
          <div style={{ textAlign: "center", margin: "20px 0 15px 0" }}>
            <a href="/forgot-password">Forgot password?</a>
            &nbsp;&nbsp;
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default LoginForm;
