import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { BasketContext } from '../../App';
import { motion } from 'framer-motion';

const Product = ({products, setBasket}) => {

    const productSlug = useParams();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const basket = useContext(BasketContext);

    const [buttonText, setButtonText] = useState("Add to basket");

    useEffect(() => {

        if (products) {
            setProduct(products.filter((x) => x.slug == productSlug.id));
        }

        setQuantity(1);

    }, [products, productSlug])

    const handleDecrement = () => {
        if (quantity === 1) return;
        setQuantity((prev) => prev - 1)
    }

    const handleAddToBasket = (e) => {
        e.preventDefault();

        const existingProduct = basket.find((existing) => existing.id == product[0].id);

        if (existingProduct) {

            const index = basket.indexOf(existingProduct);

            let updatedBasket = structuredClone(basket);

            updatedBasket[index] = {
                id: product[0].id,
                quantity: existingProduct.quantity + quantity
            }

            setBasket(() => updatedBasket);

            setButtonText("Added!");

            setTimeout(() => {
                setButtonText("Add to basket")
            }, 3000);

        } else {
            const addProduct = {
                id: product[0].id,
                quantity: quantity,
            }
            setBasket((prev) => [...prev, addProduct])

            setButtonText("Added!");

            setTimeout(() => {
                setButtonText("Add to basket")
            }, 3000);
        }
    }

    return ( 
        <>
            <div className="w-[70%] flex px-[2%] h-fit py-4 my-8 m-auto bg-white rounded font-text">
                {product && <div className="flex h-fit">
                    <div className="h-fit">
                        <img src={product[0].images[0].src} alt="" className="w-[25vw]" />
                    </div>
                    <div className="ml-4 font-text max-w-[60%] text-secondary-100 flex flex-col flex-1 h-inherit justify-between">
                        <h2 className="text-4xl pb-2 font-bold border-b-2 border-secondary-100 w-fit">{product[0].name}</h2>
                        <div className="flex-1 mt-8">
                            <p className="font-bold">Product description</p>
                            <div dangerouslySetInnerHTML={{__html: product[0].description}}></div>
                        </div>
                        <form className="flex items-center" onSubmit={handleAddToBasket}>
                            <div className="flex items-center mr-4 gap-4">
                                <FontAwesomeIcon icon={faMinus} className="text-secondary-100 text-4xl hover:cursor-pointer hover:opacity-50 duration-150" onClick={handleDecrement} />
                                <input type="number" value={quantity} className="bg-gray-50 border border-gray-300 w-12 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onChange={(e) => setQuantity(Number(e.target.value))}/>
                                <FontAwesomeIcon icon={faPlus} className="text-secondary-100 text-4xl hover:cursor-pointer hover:opacity-50 duration-150" onClick={() => setQuantity((prev) => prev + 1)} />
                            </div>
                            <button type="submit" className="px-4 py-2 rounded-full w-fit min-w-60 bg-secondary-100 font-text text-primary-100 text-2xl hover:opacity-80 hover:cursor-pointer duration-150">
                                <div className="select-none">
                                    {buttonText}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>}
            </div>
            <Divider />
        </>
     );
}
 
export default Product;

const Divider = () => {
  return (
    <div className="mt-8">
      <div className="h-[6px] mb-[4px] w-[70%] opacity-70 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[6px] mb-[5px] w-[70%] opacity-60 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[5px] mb-[5px] w-[70%] opacity-50 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[5px] mb-[6px] w-[70%] opacity-40 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[4px] mb-[6px] w-[70%] opacity-30 mx-auto bg-secondary-100 rounded-full" />
    </div>
  )
}