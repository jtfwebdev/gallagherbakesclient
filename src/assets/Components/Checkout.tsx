import { SetStateAction, useContext, useEffect, useState } from "react";
import { BasketContext, ScreenWidthContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import PaymentForm from "./PaymentForm";
import { User, BasketItem } from "../Types";

const Checkout = ({
  basketTotal,
  sessionDetails,
  setLoginModalOpen,
}: {
  basketTotal: string;
  sessionDetails: User | null;
  setLoginModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const screenWidth = useContext(ScreenWidthContext);
  const basket: BasketItem[] = useContext(BasketContext);
  const [guestCheckout, setGuestCheckout] = useState(false);
  const [paymentOptionsVisible, setPaymentOptionsVisible] = useState(false);

  return (
    <div className="bg-white text-secondary-100 mt-8 mb-8 w-[80%] flex-1 mx-auto px-12 py-8 flex flex-col font-text max-[800px]:w-[95%] max-[550px]:w-full max-[550px]:my-0 max-[550px]:px-4">
      <h2 className=" text-2xl mb-4 border-b-2 border-secondary-100 w-fit">
        Checkout
      </h2>
      {basket[0] ? (
        <div>
          <div className="flex flex-col w-full flex-1 justify-center items-start px-2 py-4 mb-4 border-b-2 border-secondary-100">
            <div>Subtotal: £{parseFloat(basketTotal).toFixed(2)}</div>
            <div>Postage & packaging: £{3.99}</div>
            <div className="font-bold text-xl">
              Grand total: £{(parseFloat(basketTotal) + 3.99).toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div>You don't have anything in your basket...</div>
      )}
      {sessionDetails || guestCheckout === true ? (
        <>
          <AnimatePresence>
            <ShippingBilling
              sessionDetails={sessionDetails}
              paymentOptionsVisible={paymentOptionsVisible}
              setPaymentOptionsVisible={setPaymentOptionsVisible}
              screenWidth={screenWidth}
            />
          </AnimatePresence>
          {paymentOptionsVisible && (
            <AnimatePresence>
              <PaymentForm basketTotal={basketTotal} />
            </AnimatePresence>
          )}
        </>
      ) : (
        <div className="flex w-full gap-24 mt-4 max-[900px]:gap-12 max-[750px]:gap-8 max-[425px]:flex-col max-[425px]:gap-2">
          <button
            onClick={() => setLoginModalOpen(true)}
            className="bg-secondary-100 flex-1 font-bold font-text text-2xl py-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-150 max-[750px]:text-lg"
          >
            Log in or register
          </button>
          {screenWidth <= 425 && (
            <div className="w-full text-center font-bold text-secondary-100">
              or
            </div>
          )}
          <button
            onClick={() => setGuestCheckout(true)}
            className="bg-secondary-100 flex-1 font-bold font-text text-2xl py-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-150 max-[750px]:text-lg"
          >
            Continue as guest
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

const ShippingBilling = ({
  sessionDetails,
  paymentOptionsVisible,
  setPaymentOptionsVisible,
  screenWidth,
}: {
  sessionDetails: User | null;
  paymentOptionsVisible: boolean;
  setPaymentOptionsVisible: React.Dispatch<SetStateAction<boolean>>;
  screenWidth: number;
}) => {
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    email: "",
  });

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    email: "",
  });

  useEffect(() => {
    if (sessionDetails?.shipping.first_name) {
      setShippingDetails({
        firstName: sessionDetails.shipping.first_name,
        lastName: sessionDetails.shipping.last_name,
        address1: sessionDetails.shipping.address_1,
        address2: sessionDetails.shipping.address_2,
        city: sessionDetails.shipping.city,
        postcode: sessionDetails.shipping.postcode,
        email: sessionDetails.email,
      });
    }

    if (sessionDetails?.billing.first_name) {
      setBillingDetails({
        firstName: sessionDetails.billing.first_name,
        lastName: sessionDetails.billing.last_name,
        address1: sessionDetails.billing.address_1,
        address2: sessionDetails.billing.address_2,
        city: sessionDetails.billing.city,
        postcode: sessionDetails.billing.postcode,
        email: sessionDetails.email,
      });
    }
  }, [sessionDetails]);

  const handleCopyShippingDetails = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setBillingDetails(shippingDetails);
  };

  const [missingInformation, setMissingInformation] = useState(false);

  const handlePaymentOptions = () => {
    const verifiableShipping: any = Object.assign({}, shippingDetails);
    delete verifiableShipping.address2;

    const verifiableBilling: any = Object.assign({}, billingDetails);
    delete verifiableBilling.address2;

    for (const key in verifiableShipping) {
      if (verifiableShipping[key] == "") {
        setMissingInformation(true);
        setTimeout(() => {
          setMissingInformation(false);
        }, 2000);
        return;
      }
    }

    for (const key in verifiableBilling) {
      if (verifiableBilling[key] == "") {
        setMissingInformation(true);
        setTimeout(() => {
          setMissingInformation(false);
        }, 2000);
        return;
      }
    }

    setPaymentOptionsVisible(true);
  };

  const missingInformationPromptVars = {
    fullScreen: {
      initial: {
        opacity: 0,
        x: "100%",
      },
      animate: {
        opacity: 1,
        x: "120%",
      },
      exit: {
        opacity: 0,
        x: "50%",
      },
    },
    mobileScreen: {
      initial: {
        opacity: 0,
        y: "100%",
      },
      animate: {
        opacity: 1,
        y: "120%",
      },
      exit: {
        opacity: 0,
        y: "50%",
      },
    },
  };

  return (
    <>
      <motion.div
        className="flex w-full h-fit font-text max-[900px]:flex-col"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
      >
        <form className="py-2 w-1/2 max-[900px]:w-full" onSubmit={undefined}>
          <h3 className="font-bold text-2xl mb-2">Shipping details</h3>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="firstName" className="text-sm">
              First name
            </label>
            <input
              name="firstName"
              id="firstName"
              value={shippingDetails.firstName}
              required
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: e.target.value,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="lastName" className="text-sm">
              Last name
            </label>
            <input
              name="lastName"
              id="lastName"
              value={shippingDetails.lastName}
              required
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: e.target.value,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="address1" className="text-sm">
              Address line 1
            </label>
            <input
              name="address1"
              id="address1"
              required
              value={shippingDetails.address1}
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: e.target.value,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="address2" className="text-sm">
              Address line 2
            </label>
            <input
              name="address2"
              id="address2"
              value={shippingDetails.address2}
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: e.target.value,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="city" className="text-sm">
              City
            </label>
            <input
              name="city"
              id="city"
              value={shippingDetails.city}
              required
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: e.target.value,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="postcode" className="text-sm">
              Postcode
            </label>
            <input
              name="postcode"
              id="postcode"
              value={shippingDetails.postcode}
              required
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: e.target.value,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="text-end flex flex-col items-start mb-2">
            <label htmlFor="emailAddress" className="text-sm">
              Email address
            </label>
            <input
              name="emailAddress"
              id="emailAddress"
              required
              value={shippingDetails.email}
              onChange={(e) =>
                setShippingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
            />
          </div>
        </form>
        <form className="py-2 w-1/2 max-[900px]:w-full" onSubmit={undefined}>
          <div className="flex w-full min-[901px]:justify-end flex-wrap gap-4 mb-2">
            <h3 className="font-bold text-2xl w-fit">Billing details</h3>
            {(screenWidth > 1050 || screenWidth <= 900) && (
              <button
                onClick={handleCopyShippingDetails}
                className="bg-secondary-100 px-4 py-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-200"
              >
                Same as shipping?
              </button>
            )}
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="firstName" className="text-sm">
              First name
            </label>
            <input
              name="firstName"
              id="firstName"
              value={billingDetails.firstName}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: e.target.value,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="lastName" className="text-sm">
              Last name
            </label>
            <input
              name="lastName"
              id="lastName"
              value={billingDetails.lastName}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: e.target.value,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="address1" className="text-sm">
              Address line 1
            </label>
            <input
              name="address1"
              id="address1"
              value={billingDetails.address1}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: e.target.value,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="address2" className="text-sm">
              Address line 2
            </label>
            <input
              name="address2"
              id="address2"
              value={billingDetails.address2}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: e.target.value,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="city" className="text-sm">
              City
            </label>
            <input
              name="city"
              id="city"
              value={billingDetails.city}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: e.target.value,
                  postcode: prev.postcode,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="postcode" className="text-sm">
              Postcode
            </label>
            <input
              name="postcode"
              id="postcode"
              value={billingDetails.postcode}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: e.target.value,
                  email: prev.email,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="min-[901px]:text-end flex flex-col min-[901px]:items-end mb-2">
            <label htmlFor="email" className="text-sm">
              Email address
            </label>
            <input
              name="email"
              id="email"
              value={billingDetails.email}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  firstName: prev.firstName,
                  lastName: prev.lastName,
                  address1: prev.address1,
                  address2: prev.address2,
                  city: prev.city,
                  postcode: prev.postcode,
                  email: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm min-[901px]:text-end rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          {screenWidth <= 1050 && screenWidth > 900 && (
            <button
              onClick={handleCopyShippingDetails}
              className="bg-secondary-100 px-8 py-2 mt-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-200 min-[901px]:float-right"
            >
              Same as shipping?
            </button>
          )}
        </form>
      </motion.div>
      {!paymentOptionsVisible && (
        <div className="relative w-fit">
          <button
            onClick={handlePaymentOptions}
            className="w-fit bg-secondary-100 my-4 px-16 py-2 text-white rounded-lg hover:cursor-pointer hover:opacity-80 duration-200"
          >
            Proceed to payment
          </button>
          <AnimatePresence>
            {missingInformation && (
              <motion.div
                className="absolute top-1/2 font-bold"
                initial={
                  screenWidth > 670
                    ? missingInformationPromptVars.fullScreen.initial
                    : missingInformationPromptVars.mobileScreen.initial
                }
                animate={
                  screenWidth > 670
                    ? missingInformationPromptVars.fullScreen.animate
                    : missingInformationPromptVars.mobileScreen.animate
                }
                exit={
                  screenWidth > 670
                    ? missingInformationPromptVars.fullScreen.exit
                    : missingInformationPromptVars.mobileScreen.exit
                }
              >
                Please fill out all required fields.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};
