import axios from 'axios';

const UpdatePassword = (data, setButtonText, setActivePanel) => {

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
    }

    axios.post(`${import.meta.env.VITE_API_URL}/changepassword`, data, {headers: headers})
    .then((res) => {
        if (res.status === 200) {
            setButtonText("Saved!");
            setTimeout(() => {
                setActivePanel('')
            }, 3000)
        } else {
            setButtonText("Please try again later.")
            setTimeout(() => {
                setButtonText("Save")
            }, 3000)
        }
    })
    .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
            setButtonText("Incorrect password!");
            setTimeout(() => {
                setButtonText("Save")
        }, 3000);
        } else {
            setButtonText("Please try again later.")
            setTimeout(() => {
                setButtonText("Save")
            }, 3000)
        }
    })
}

export default UpdatePassword;