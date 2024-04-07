import axios from "axios";

const Login = (email, password, setSessionDetails, setLoginModalOpen, setButtonText) => {

    const payload = JSON.stringify({
        "username": email,
        "password": password
    })

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
    }

    axios.post(`${import.meta.env.VITE_API_URL}/login`, payload, {headers})
    .then((res) => {
        localStorage.setItem('token', res.data.token);
        setSessionDetails(res.data.userDetails[0][0]);
        setLoginModalOpen(false);
    })
    .catch((err) => {
        setButtonText("Credentials not recognised")
        setTimeout(() => {
            setButtonText("Sign in")
        }, 3000)
    })
}

export default Login;