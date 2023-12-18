import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { useState,  useEffect } from "react";
import { auth } from "../firebase/firebaseconfig";
import { useUser } from "../elements/UserProvider";

const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const textFieldStyle = {
    height: 40,
    width: 250,
    margin: 3.5,
}

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

function LoginModal(props: LoginModalProps) {
    const [open, setOpen] = useState(props.open);
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { userId, login, logout } = useUser();

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);
    
    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    function handlePressEnter(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (event.key === "Enter") {
          if(signUp){
            handleSignUp();
          }else {
            handleLogin();
          }
        }
    }

    const handleLogin = async () => {
      if(!password || !email){
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Logged in user:", user);
        login(user.uid);
        handleClose();
      } catch (error) {
          switch ((error as AuthError).code) {
            case "auth/invalid-email":
              setErrorMessage("Please enter a valid Email Address");
              break;
            case "auth/user-not-found" || "auth/wrong-password":
              setErrorMessage('User does not exist or password is incorrect');
              break;
            default:
              setErrorMessage("Eror while trying to Log you in");
          }
      }
    }

    const handleSignUp = async () => {
      if(password !== confirmPassword){
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Logged in user:", user);
        handleClose();
        login(user.uid)
      } catch (error) {
        switch ((error as AuthError).code) {
          case "auth/invalid-email":
            setErrorMessage("Please enter a valid Email Address");
            break;
          default:
            setErrorMessage("Error while Signing up");
        }
      }
    };

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {signUp ? "Sign Up" : "Login"}
          </Typography>
          {errorMessage ? (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "red" }}
            >
              {errorMessage}
            </Typography>
          ) : (
            <></>
          )}
          <TextField
            sx={textFieldStyle}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handlePressEnter}
          />
          <TextField
            sx={textFieldStyle}
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePressEnter}
          />

          {signUp ? (
            <TextField
              sx={textFieldStyle}
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              autoComplete="current-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handlePressEnter}
            />
          ) : (
            <></>
          )}

          {signUp ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Already Signed Up? Then{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setSignUp(false)}
              >
                Login
              </span>
            </Typography>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              No Account yet? Then{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </span>
            </Typography>
          )}
        </Box>
      </Modal>
    );
}

export default LoginModal;
