import { useContext, useState } from "react";
import { BasketContext } from "../../App";
import { AnimatePresence, motion } from 'framer-motion';

const Checkout = ({basketTotal, sessionDetails, setLoginModalOpen}) => {

    const basket = useContext(BasketContext);
    const [guestCheckout, setGuestCheckout] = useState(false);

    return ( 
        <div className="bg-white mt-8 w-[80%] mx-auto px-12 py-4 flex flex-col">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Checkout</h2>
            {basket[0] ? 
            <div>
                <div className="flex flex-col w-fit flex-1 justify-center items-start px-2 py-2">
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
                
            </div> :
            <div>You don't have anything in your basket...</div>
            }
            {
                sessionDetails || (guestCheckout === true) ?
                <AnimatePresence> 
                    <ShippingBilling /> 
                </AnimatePresence>
                : 
                <div className="flex w-full gap-24 mt-4">
                    <button onClick={() => setLoginModalOpen(true)} className="bg-secondary-100 flex-1 font-bold font-text text-2xl py-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-150">Log in or register</button>
                    <button onClick={() => setGuestCheckout(true)} className="bg-secondary-100 flex-1 font-bold font-text text-2xl py-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-150">Continue as guest</button>
                </div>
                
            }
        </div>
     );
}
 
export default Checkout;

const ShippingBilling = () => {
    return (
        <motion.div className="flex w-full h-fit" initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 100}}>
                    <form className="py-2 w-1/2" onSubmit={undefined}>
                        <h3 className="font-bold text-2xl mb-2">Shipping details</h3>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="firstName" className="text-sm">First name</label>
                            <input 
                                name="firstName" 
                                id="firstName" 
                                // value=
                                // onChange={(e) => setDetails(prev => ({firstName: e.target.value, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="lastName" className="text-sm">Last name</label>
                            <input 
                                name="lastName" 
                                id="lastName" 
                                //value={details.lastName}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: e.target.value, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="address1" className="text-sm">Address line 1</label>
                            <input 
                                name="address1" 
                                id="address1" 
                                //value={details.address1}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: e.target.value, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="address2" className="text-sm">Address line 2</label>
                            <input 
                                name="address2" 
                                id="address2" 
                                //value={details.address2}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: e.target.value, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="city" className="text-sm">City</label>
                            <input 
                                name="city" 
                                id="city" 
                                //value={details.city}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: e.target.value, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="postcode" className="text-sm">Postcode</label>
                            <input 
                                name="postcode" 
                                id="postcode" 
                                //value={details.postcode}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: e.target.value, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-start mb-2">
                            <label htmlFor="contactNumber" className="text-sm">Contact number</label>
                            <input 
                                name="contactNumber" 
                                id="contactNumber" 
                                //value={details.contactNumber}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: e.target.value}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                    </form>
                    <form className="py-2 w-1/2" onSubmit={undefined}>
                        <div className="flex w-full justify-end flex-wrap gap-4 mb-2">
                            <h3 className="font-bold text-2xl w-fit">Billing details</h3>
                            <button className="bg-secondary-100 px-4 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-200">Same as shipping?</button>
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="firstName" className="text-sm">First name</label>
                            <input 
                                name="firstName" 
                                id="firstName" 
                                // value=
                                // onChange={(e) => setDetails(prev => ({firstName: e.target.value, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="lastName" className="text-sm">Last name</label>
                            <input 
                                name="lastName" 
                                id="lastName" 
                                //value={details.lastName}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: e.target.value, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="address1" className="text-sm">Address line 1</label>
                            <input 
                                name="address1" 
                                id="address1" 
                                //value={details.address1}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: e.target.value, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="address2" className="text-sm">Address line 2</label>
                            <input 
                                name="address2" 
                                id="address2" 
                                //value={details.address2}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: e.target.value, city: prev.city, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="city" className="text-sm">City</label>
                            <input 
                                name="city" 
                                id="city" 
                                //value={details.city}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: e.target.value, postcode: prev.postcode, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="postcode" className="text-sm">Postcode</label>
                            <input 
                                name="postcode" 
                                id="postcode" 
                                //value={details.postcode}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: e.target.value, contactNumber: prev.contactNumber}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                        <div className="text-end flex flex-col items-end mb-2">
                            <label htmlFor="contactNumber" className="text-sm">Contact number</label>
                            <input 
                                name="contactNumber" 
                                id="contactNumber" 
                                //value={details.contactNumber}
                                //onChange={(e) => setDetails(prev => ({firstName: prev.firstName, lastName: prev.lastName, address1: prev.address1, address2: prev.address2, city: prev.city, postcode: prev.postcode, contactNumber: e.target.value}))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                        </div>
                    </form>
                </motion.div>
    )
}