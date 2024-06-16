import axios from "axios";
import { SetStateAction } from "react";
import { User } from "../Types";

const Login = (
  email: string,
  password: string,
  setSessionDetails: React.Dispatch<SetStateAction<User | null>>,
  setLoginModalOpen: React.Dispatch<SetStateAction<boolean>>,
  setButtonText: React.Dispatch<SetStateAction<string>>
) => {
  const payload = JSON.stringify({
    username: email,
    password: password,
  });

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  };

  axios
    .post(`${import.meta.env.VITE_API_URL}/login`, payload, { headers })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      setSessionDetails(res.data.userDetails[0][0]);
      setLoginModalOpen(false);
    })
    .catch(() => {
      setButtonText("Credentials not recognised");
      setTimeout(() => {
        setButtonText("Sign in");
      }, 3000);
    });
};

export default Login;
