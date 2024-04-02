import axios from 'axios';

const AuthToken = (token) => {
    const headers = {
        "Authorization": "Bearer " + token
    }

    axios.get('/user', {headers: headers})
    
}

export default AuthToken;