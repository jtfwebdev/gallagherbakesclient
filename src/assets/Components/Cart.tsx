import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Cart = ({setCartModalOpen}: {setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

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
            </div>
        </motion.div>
     );
}
 
export default Cart;