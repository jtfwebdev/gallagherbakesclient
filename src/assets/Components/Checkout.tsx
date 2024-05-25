import { useContext } from "react";
import { BasketContext } from "../../App";

const Checkout = ({basketTotal, sessionDetails}) => {

    const basket = useContext(BasketContext);

    return ( 
        <div className="bg-white mt-8 w-[80%] mx-auto px-12 py-4 flex flex-col">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Checkout</h2>
            {basket[0] ? <div className="flex flex-col w-fit flex-1 justify-center items-start px-2 py-2">
                <div>
                    Subtotal: {basketTotal}
                </div>
                <div>
                    Postage & packaging: £{3.99}
                </div>
                <div>
                    Grand total: {(parseInt(basketTotal) + 3.99).toFixed(2)}
                </div>
            </div> :
            <div>You don't have anything in your basket...</div>
            }
            {basket[0] && !sessionDetails && <button className="w-fit mt-4 text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-lg px-10 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800">Log in or register to place your order...</button>}
        </div>
     );
}
 
export default Checkout;