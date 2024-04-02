import axios from 'axios';

const UpdatePassword = (data) => {

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
    }

    axios.post(`${import.meta.env.VITE_API_URL}/changepassword`, data, {headers: headers})
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}

export default UpdatePassword;