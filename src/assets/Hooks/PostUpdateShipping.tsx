import axios from "axios";

const PostUpdateShipping = (data) => {

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
    }

    console.log("submit")

    const token = localStorage.getItem('token');

    const payload = JSON.stringify({
        token: token,
        data: data
    })

    axios.put(`${import.meta.env.VITE_API_URL}/updateuser`, payload, {headers})

}

export default PostUpdateShipping;