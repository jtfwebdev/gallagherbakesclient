import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Login from "../Hooks/Login";
import Register from "../Hooks/Register";
import { User } from "../Types";

const LoginRegisterModal = ({
  setLoginModalOpen,
  setSessionDetails,
}: {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionDetails: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const loginPanelRef = useRef(null);
  const [registerPanelActive, setRegisterPanelActive] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        loginPanelRef.current &&
        !loginPanelRef.current.contains(event.target)
      ) {
        setLoginModalOpen(false);
      }
    };

    setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 500);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <motion.div
      className="fixed z-50 h-full w-full py-2 flex items-center justify-center inset-x-0 inset-y-0 bg-transparent backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        ref={loginPanelRef}
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
      >
        {!registerPanelActive ? (
          <AnimatePresence>
            <LoginPanel
              setSessionDetails={setSessionDetails}
              setLoginModalOpen={setLoginModalOpen}
              setRegisterPanelActive={setRegisterPanelActive}
            />
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <RegisterPanel
              setRegisterPanelActive={setRegisterPanelActive}
              setSessionDetails={setSessionDetails}
              setLoginModalOpen={setLoginModalOpen}
            />
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default LoginRegisterModal;

const LoginPanel = ({
  setSessionDetails,
  setLoginModalOpen,
  setRegisterPanelActive,
}: {
  setSessionDetails: React.Dispatch<SetStateAction<User | null>>;
  setLoginModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setRegisterPanelActive: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [buttonText, setButtonText] = useState("Sign in");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    Login(
      form.email,
      form.password,
      setSessionDetails,
      setLoginModalOpen,
      setButtonText
    );
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setRegisterPanelActive(true);
  };

  return (
    <motion.div
      className="p-6 space-y-4 md:space-y-6 sm:p-8"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    >
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e: React.MouseEvent<HTMLFormElement, MouseEvent>) =>
          handleSubmit(e)
        }
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            onChange={(e) =>
              setForm((prev) => ({
                email: e.target.value,
                password: prev.password,
              }))
            }
            value={form.email}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setForm((prev) => ({
                email: prev.email,
                password: e.target.value,
              }))
            }
            value={form.password}
            required={true}
          />
        </div>
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-medium text-secondary-100 hover:underline dark:text-secondary-100"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800"
        >
          {buttonText}
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <button
            type="button"
            onClick={(e) => handleSignUp(e)}
            className="font-medium text-secondary-100 hover:underline inline dark:text-secondary-100"
          >
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
};

const RegisterPanel = ({
  setRegisterPanelActive,
  setLoginModalOpen,
  setSessionDetails,
}: {
  setRegisterPanelActive: React.Dispatch<SetStateAction<boolean>>;
  setLoginModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setSessionDetails: React.Dispatch<SetStateAction<User | null>>;
}) => {
  const handleLogIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setRegisterPanelActive(false);
  };

  const [buttonText, setButtonText] = useState("Create account");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repPassword: "",
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    if (form.password == form.repPassword) {
      Register(
        form.firstName,
        form.lastName,
        form.email,
        form.password,
        setSessionDetails,
        setLoginModalOpen
      );
    } else {
      setButtonText("Passwords must match!");
      setTimeout(() => {
        setButtonText("Create account");
      }, 2000);
    }
  };

  return (
    <motion.div
      className="p-6 space-y-4 md:space-y-6 sm:p-8"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    >
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create an account
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e: React.MouseEvent<HTMLFormElement, MouseEvent>) =>
          handleSubmit(e)
        }
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Joe"
              onChange={(e) =>
                setForm((prev) => ({
                  firstName: e.target.value,
                  lastName: prev.lastName,
                  email: prev.email,
                  password: prev.password,
                  repPassword: prev.repPassword,
                }))
              }
              value={form.firstName}
              required={true}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bloggs"
              onChange={(e) =>
                setForm((prev) => ({
                  firstName: prev.firstName,
                  lastName: e.target.value,
                  email: prev.email,
                  password: prev.password,
                  repPassword: prev.repPassword,
                }))
              }
              value={form.lastName}
              required={true}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="joe@bloggs.com"
            onChange={(e) =>
              setForm((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                email: e.target.value,
                password: prev.password,
                repPassword: prev.repPassword,
              }))
            }
            value={form.email}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setForm((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                email: prev.email,
                password: e.target.value,
                repPassword: prev.repPassword,
              }))
            }
            value={form.password}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="repeatpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Re-enter password
          </label>
          <input
            type="password"
            name="repeatpassword"
            id="repeatpassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setForm((prev) => ({
                firstName: prev.firstName,
                lastName: prev.lastName,
                email: prev.email,
                password: prev.password,
                repPassword: e.target.value,
              }))
            }
            required={true}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800"
        >
          {buttonText}
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleLogIn(e)
            }
            className="font-medium text-secondary-100 hover:underline inline dark:text-secondary-100"
          >
            Log in
          </button>
        </p>
      </form>
    </motion.div>
  );
};
