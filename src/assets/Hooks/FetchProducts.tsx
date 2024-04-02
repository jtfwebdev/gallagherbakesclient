import axios from 'axios';

const FetchProducts = (setProducts: React.Dispatch<React.SetStateAction<any[] | null>>) => {

    const headers = {
        "Access-Control-Allow-Origin": true
    }

    axios.get(`${import.meta.env.VITE_API_URL}/products`, {headers})
    .then((res) => {
        setProducts(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

export default FetchProducts;