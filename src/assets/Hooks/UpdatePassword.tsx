import axios from "axios";
import { SetStateAction } from "react";

interface UpdatePasswordData {
  token: string | null;
  id: number;
  username: string;
  password: string;
  newPassword: string;
}

const UpdatePassword = (
  data: UpdatePasswordData,
  setButtonText: React.Dispatch<SetStateAction<string>>,
  setActivePanel: React.Dispatch<SetStateAction<string>>
) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  };

  axios
    .post(
      `${import.meta.env.VITE_API_URL}/changepassword`,
      JSON.stringify(data),
      {
        headers: headers,
      }
    )
    .then((res) => {
      if (res.status === 200) {
        setButtonText("Saved!");
        setTimeout(() => {
          setActivePanel("");
        }, 3000);
      } else {
        setButtonText("Please try again later.");
        setTimeout(() => {
          setButtonText("Save");
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 401) {
        setButtonText("Incorrect password!");
        setTimeout(() => {
          setButtonText("Save");
        }, 3000);
      } else {
        setButtonText("Please try again later.");
        setTimeout(() => {
          setButtonText("Save");
        }, 3000);
      }
    });
};

export default UpdatePassword;
