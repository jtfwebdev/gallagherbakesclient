import { SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import PostUpdateShipping from "../Hooks/PostUpdateShipping";
import UpdatePassword from "../Hooks/UpdatePassword";
import { User, BasketItem } from "../Types";

const AccountPage = ({
  setSessionDetails,
  setBasket,
}: {
  setSessionDetails: React.Dispatch<React.SetStateAction<User | null>>;
  setBasket: React.Dispatch<SetStateAction<BasketItem[]>>;
}) => {
  const buttonStyle =
    "w-full mx-auto text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800";
  const returnButtonStyle =
    "w-full mx-auto text-white bg-secondaryBtn-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800";

  const userDetails: User | null = useContext(SessionContext);

  const [activePanel, setActivePanel] = useState("");

  const navigate = useNavigate();

  const getPanel = () => {
    switch (activePanel) {
      case "":
        return (
          <AnimatePresence>
            <ShippingInfo userDetails={userDetails} />
          </AnimatePresence>
        );
      case "update shipping":
        return (
          <AnimatePresence>
            <UpdateDetails
              userDetails={userDetails}
              setSessionDetails={setSessionDetails}
              setActivePanel={setActivePanel}
            >
              Shipping
            </UpdateDetails>
          </AnimatePresence>
        );
      case "update billing":
        return (
          <AnimatePresence>
            <UpdateDetails
              userDetails={userDetails}
              setSessionDetails={setSessionDetails}
              setActivePanel={setActivePanel}
            >
              Billing
            </UpdateDetails>
          </AnimatePresence>
        );
      case "change password":
        return (
          <AnimatePresence>
            <ChangePassword
              userDetails={userDetails}
              setActivePanel={setActivePanel}
            />
          </AnimatePresence>
        );
    }
  };

  const handleSignout = () => {
    setSessionDetails(null);
    localStorage.removeItem("token");
    setBasket([]);
    navigate("/");
  };

  return (
    <motion.div
      className="
        w-[70%] flex flex-col flex-1 px-[2%] py-4 my-8 m-auto bg-white rounded font-text
        max-[1000px]:w-[95%]
        "
    >
      <div className="flex flex-col text-4xl font-bold font-text max-[700px]:text-2xl">
        <div className="flex align-center justify-between gap-32 pb-4 border-b-2 border-secondary-100">
          <h2 className="inline">My Account</h2>
          {userDetails && (
            <div className="inline">
              {`${userDetails.first_name} ${userDetails.last_name}`}
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-4 max-[700px]:flex-col-reverse">
        <div className="w-[50%] pr-8 flex flex-col h-fit max-[700px]:w-full">
          <div className="flex-1">
            <h4 className="text-xl">Recent orders</h4>
            <div>You haven't placed any orders yet.</div>
          </div>
          <div className="w-fit flex flex-col gap-4 mt-8">
            {activePanel !== "" && (
              <button
                onClick={() => setActivePanel("")}
                className={returnButtonStyle}
              >
                Return to My Account
              </button>
            )}
            <button
              onClick={() => setActivePanel("update shipping")}
              className={buttonStyle}
            >
              Update shipping information
            </button>
            <button
              onClick={() => setActivePanel("update billing")}
              className={buttonStyle}
            >
              Update billing information
            </button>
            <button
              onClick={() => setActivePanel("change password")}
              className={buttonStyle}
            >
              Change password
            </button>
            <button className={buttonStyle} onClick={handleSignout}>
              Sign out
            </button>
          </div>
        </div>
        <div className="w-[50%] pl-8 max-[700px]:pl-0 max-[700px]:mb-8">
          {userDetails && <div className="w-full">{getPanel()}</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountPage;

const ShippingInfo = ({ userDetails }: { userDetails: User | null }) => {
  return (
    <motion.div
      className="w-full text-end font-text flex flex-col max-[700px]:text-start"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <div>
        <p className="text-xs font-bold pt-2">Email address</p>
        <p className="text-xl">{userDetails ? userDetails.email : ""}</p>
      </div>
      <h3 className="font-bold text-2xl mt-4">Shipping information</h3>
      <div>
        <p className="text-xs font-bold pt-2">Address line 1</p>
        <p className="text-xl">
          {userDetails ? userDetails.shipping.address_1 : ""}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold pt-2">Address line 2</p>
        <p className="text-xl">
          {userDetails ? userDetails.shipping.address_2 : ""}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold pt-2">City</p>
        <p className="text-xl">
          {userDetails ? userDetails.shipping.city : ""}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold pt-2">Postcode</p>
        <p className="text-xl">
          {userDetails ? userDetails.shipping.postcode : ""}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold pt-2">Contact number</p>
        <p className="text-xl">
          {userDetails ? userDetails.shipping.phone : ""}
        </p>
      </div>
    </motion.div>
  );
};

const UpdateDetails = ({
  children,
  userDetails,
  setSessionDetails,
  setActivePanel,
}: {
  children: string;
  userDetails: User | null;
  setSessionDetails: React.Dispatch<React.SetStateAction<User | null>>;
  setActivePanel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [buttonText, setButtonText] = useState("Save");

  const field = children;
  const fieldCase = field.toLowerCase();

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    contactNumber: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userDetails) {
      setButtonText("Saving...");

      const data = {
        [fieldCase]: {
          userId: userDetails.id,
          first_name: details.firstName,
          last_name: details.lastName,
          address_1: details.address1,
          address_2: details.address2,
          city: details.city,
          postcode: details.postcode,
          phone: details.contactNumber,
        },
      };

      PostUpdateShipping(
        data,
        setButtonText,
        setSessionDetails,
        setActivePanel
      );
    } else setButtonText("Must be logged in.");
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="text-end font-text w-full max-[700px]:text-start"
    >
      <h2 className="text-lg font-bold">Update {field} information</h2>
      <form className="py-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="firstName" className="text-sm">
            First name
          </label>
          <input
            name="firstName"
            id="firstName"
            value={details.firstName}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: e.target.value,
                lastName: prev.lastName,
                address1: prev.address1,
                address2: prev.address2,
                city: prev.city,
                postcode: prev.postcode,
                contactNumber: prev.contactNumber,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="lastName" className="text-sm">
            Last name
          </label>
          <input
            name="lastName"
            id="lastName"
            value={details.lastName}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: prev.firstName,
                lastName: e.target.value,
                address1: prev.address1,
                address2: prev.address2,
                city: prev.city,
                postcode: prev.postcode,
                contactNumber: prev.contactNumber,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[50%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="address1" className="text-sm">
            Address line 1
          </label>
          <input
            name="address1"
            id="address1"
            value={details.address1}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                address1: e.target.value,
                address2: prev.address2,
                city: prev.city,
                postcode: prev.postcode,
                contactNumber: prev.contactNumber,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="address2" className="text-sm">
            Address line 2
          </label>
          <input
            name="address2"
            id="address2"
            value={details.address2}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                address1: prev.address1,
                address2: e.target.value,
                city: prev.city,
                postcode: prev.postcode,
                contactNumber: prev.contactNumber,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <input
            name="city"
            id="city"
            value={details.city}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                address1: prev.address1,
                address2: prev.address2,
                city: e.target.value,
                postcode: prev.postcode,
                contactNumber: prev.contactNumber,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="postcode" className="text-sm">
            Postcode
          </label>
          <input
            name="postcode"
            id="postcode"
            value={details.postcode}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                address1: prev.address1,
                address2: prev.address2,
                city: prev.city,
                postcode: e.target.value,
                contactNumber: prev.contactNumber,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <div className="text-end flex flex-col items-end mb-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="contactNumber" className="text-sm">
            Contact number
          </label>
          <input
            name="contactNumber"
            id="contactNumber"
            value={details.contactNumber}
            onChange={(e) =>
              setDetails((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                address1: prev.address1,
                address2: prev.address2,
                city: prev.city,
                postcode: prev.postcode,
                contactNumber: e.target.value,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="w-fit mt-4 text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800"
        >
          {buttonText}
        </button>
      </form>
    </motion.div>
  );
};

const ChangePassword = ({
  userDetails,
  setActivePanel,
}: {
  userDetails: User | null;
  setActivePanel: React.Dispatch<SetStateAction<string>>;
}) => {
  const [updateDetails, setUpdateDetails] = useState({
    password: "",
    newPassword: "",
    verifyNewPassword: "",
  });

  const [buttonText, setButtonText] = useState("Save");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updateDetails.newPassword !== updateDetails.verifyNewPassword) {
      setButtonText("Passwords do not match!");
      setTimeout(() => {
        setButtonText("Save");
      }, 3000);
      return;
    }

    if (userDetails) {
      setButtonText("Saving...");

      const token = localStorage.getItem("token");

      const data = {
        token: token,
        id: userDetails.id,
        username: userDetails.email,
        password: updateDetails.password,
        newPassword: updateDetails.newPassword,
      };
      UpdatePassword(data, setButtonText, setActivePanel);
    } else setButtonText("Must be logged in.");
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="w-full text-end font-text flex flex-col max-[700px]:text-start"
    >
      <h2 className="text-lg font-bold">Change your password</h2>
      <form className="py-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="w-[100%] flex flex-col items-end mt-8 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="oldpassword" className="text-sm">
            Enter your current password
          </label>
          <input
            type="password"
            name="oldpassword"
            id="oldpassword"
            required={true}
            value={updateDetails.password}
            onChange={(e) =>
              setUpdateDetails((prev) => ({
                password: e.target.value,
                newPassword: prev.newPassword,
                verifyNewPassword: prev.verifyNewPassword,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-base text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="w-[100%] flex flex-col items-end mt-16 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="newpassword" className="text-sm">
            Enter your new password
          </label>
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            required={true}
            value={updateDetails.newPassword}
            onChange={(e) =>
              setUpdateDetails((prev) => ({
                password: prev.password,
                newPassword: e.target.value,
                verifyNewPassword: prev.verifyNewPassword,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="w-[100%] flex flex-col items-end mt-2 max-[700px]:text-start max-[700px]:items-start">
          <label htmlFor="verifynewpassword" className="text-sm">
            Verify your new password
          </label>
          <input
            type="password"
            name="verifynewpassword"
            id="verifynewpassword"
            required={true}
            value={updateDetails.verifyNewPassword}
            onChange={(e) =>
              setUpdateDetails((prev) => ({
                password: prev.password,
                newPassword: prev.newPassword,
                verifyNewPassword: e.target.value,
              }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg text-end max-[700px]:text-start rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-[70%] p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <motion.button
          layout
          transition={{ duration: 0.2 }}
          type="submit"
          className="w-fit mt-4 text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800"
        >
          {buttonText}
        </motion.button>
      </form>
    </motion.div>
  );
};
