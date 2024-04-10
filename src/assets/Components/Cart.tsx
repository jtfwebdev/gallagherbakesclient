import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useContext, useState } from 'react';
import { BasketContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Cart = ({setCartModalOpen, products, setBasket}: {setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const basket = useContext(BasketContext);

    const cartPanelRef = useRef(null);

    useEffect(() => {

        const handleClick = (event) => {
            
            if (cartPanelRef.current && !cartPanelRef.current.contains(event.target)) {
                setCartModalOpen(null);
            }
        }

        setTimeout(() => {
            window.addEventListener("click", handleClick);
        }, 500);
        
        return () => window.removeEventListener("click", handleClick);
    }, [])

    return ( 
        <motion.div 
        className="fixed z-50 h-full w-full py-2 flex items-center justify-center inset-x-0 inset-y-0 bg-transparent backdrop-blur"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <div ref={cartPanelRef} className="w-[80%] h-[70%] px-8 py-4 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Your Shopping Cart</h2>
                <div>
                    {basket && <div className="flex flex-col">
                        {basket.map((product, idx) => {
                            return <AnimatePresence>   
                                <CartProduct key={idx} products={products} product={product} basket={basket} setBasket={setBasket} />
                                </AnimatePresence>
                        })}
                    </div>}
                    {basket && !basket[0] && 
                        <div>
                            <h3>You don't have any products in your basket.</h3>
                        </div>
                    }
                </div>
            </div>
        </motion.div>
     );
}
 
export default Cart;

const CartProduct = ({products, product, basket, setBasket}) => {

    const [quantity, setQuantity] = useState(product.quantity);
    
    const productDetails = products.filter((x) => x.id == product.id);

    const handleDecrement = () => {
        if (quantity === 1) return;
        setQuantity((prev) => prev - 1)
    }

    const handleDeleteFromCart = (e) => {

        e.stopPropagation();

        const productToDelete = basket.find((x) => x.id == product.id)
        
        let updatedBasket = basket.filter((item) => item !== productToDelete);
        
        setBasket((prev) => updatedBasket);
    }

    useEffect(() => {

        const productToUpdate = basket.find((x) => x.id == product.id)
        const index = basket.indexOf(productToUpdate);

        let updatedBasket = structuredClone(basket);

        updatedBasket[index] = {
            id: product.id,
            quantity: quantity
        }

        setBasket((prev) => updatedBasket);

    }, [quantity])
    
    return (
        <motion.div initial={{opacity: 0, y: -200}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -200}} className="flex">
            <img className="w-52" src={productDetails[0].images[0].src} alt="" />
            <div className="pl-4 flex flex-1 items-center justify-between">
                <div>
                    {productDetails[0].name}
                </div>
                <div className="flex items-center mr-4 gap-4">
                    <FontAwesomeIcon icon={faMinus} className="text-secondary-100 text-4xl hover:opacity-60 hover:cursor-pointer duration-100" onClick={handleDecrement} />
                    <input type="number" value={quantity} className="bg-gray-50 border border-gray-300 w-12 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onChange={(e) => setQuantity(Number(e.target.value))}/>
                    <FontAwesomeIcon icon={faPlus} className="text-secondary-100 text-4xl hover:opacity-60 hover:cursor-pointer duration-100" onClick={() => setQuantity((prev) => prev + 1)} />
                </div>
                <div className="text-red-400 hover:text-red-200 hover:cursor-pointer duration-100"  onClick={handleDeleteFromCart}>
                    Remove <FontAwesomeIcon icon={faTrashCan} className="text-inherit" />
                </div>
            </div>
        </motion.div>
    )
}