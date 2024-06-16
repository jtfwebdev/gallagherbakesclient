import axios from "axios";
import { SetStateAction } from "react";
import { User } from "../Types";

interface Data {
  userId: number;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  phone: string;
}

interface UpdateShippingBilling {
  [field: string]: Data;
}

const PostUpdateShipping = (
  data: UpdateShippingBilling,
  setButtonText: React.Dispatch<SetStateAction<string>>,
  setSessionDetails: React.Dispatch<SetStateAction<User | null>>,
  setActivePanel: React.Dispatch<SetStateAction<string>>
) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  };

  const token = localStorage.getItem("token");

  const payload = JSON.stringify({
    token: token,
    data: data,
  });

  axios
    .put(`${import.meta.env.VITE_API_URL}/updateuser`, payload, { headers })
    .then((res) => {
      if (res.status === 200) {
        setSessionDetails(res.data);
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
    .catch(() => {
      setButtonText("Please try again later.");
      setTimeout(() => {
        setButtonText("Save");
      }, 3000);
    });
};

export default PostUpdateShipping;
