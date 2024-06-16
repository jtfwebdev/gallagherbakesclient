import axios from "axios";
import { SetStateAction } from "react";
import { User } from "../Types";

const Register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  setSessionDetails: React.Dispatch<SetStateAction<User | null>>,
  setLoginModalOpen: React.Dispatch<SetStateAction<boolean>>
) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  };

  const payload = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  });

  axios
    .post(`${import.meta.env.VITE_API_URL}/register`, payload, { headers })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      setSessionDetails(res.data.userDetails[0][0]);
      setLoginModalOpen(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Register;
