import { useContext } from "react";
import { BasketContext } from "../../App";

const Checkout = ({basketTotal}) => {

    const basket = useContext(BasketContext);

    return ( 
        <div className="bg-white mt-8 w-[80%] mx-auto px-12 py-4 flex flex-col">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Checkout</h2>
            <div className="flex flex-col w-fit flex-1 justify-center items-start px-2 py-2 border-solid border-stone-300 border-2 rounded">
                <div>
                    Subtotal: {basketTotal}
                </div>
                <div>
                    Postage & packaging: £{3.99}
                </div>
                <div>
                    Grand total: {(parseInt(basketTotal) + 3.99).toFixed(2)}
                </div>
            </div>
        </div>
     );
}
 
export default Checkout;