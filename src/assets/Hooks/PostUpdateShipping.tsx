import axios from "axios";

const PostUpdateShipping = (data, setButtonText, setSessionDetails, setActivePanel) => {

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
    }

    const token = localStorage.getItem('token');

    const payload = JSON.stringify({
        token: token,
        data: data
    })

    axios.put(`${import.meta.env.VITE_API_URL}/updateuser`, payload, {headers})
    .then((res) => {
        if (res.status === 200) {
            setSessionDetails(res.data);
            setButtonText("Saved!")
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
        setButtonText("Please try again later.")
        setTimeout(() => {
            setButtonText("Save")
        }, 3000)
    })
}

export default PostUpdateShipping;