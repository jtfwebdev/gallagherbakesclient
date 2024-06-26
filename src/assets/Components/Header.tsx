import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import "../Styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faCircleUser,
  faCartShopping,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { ScreenWidthContext } from "../../App";
import { SessionContext } from "../../App";
import { SingularProduct, User } from "../Types";

const Header = ({
  menuOpen,
  setMenuOpen,
  setLoginModalOpen,
  setCartModalOpen,
  products,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: SingularProduct[] | null;
}) => {
  const screenWidth = useContext(ScreenWidthContext);
  const session = useContext(SessionContext);
  const navigate: any = useNavigate();

  const handleAccountClick = () => {
    if (!session) {
      setLoginModalOpen(true);
    } else navigate("/myaccount");
  };

  return (
    <div className="w-full relative flex justify-between h-16 bg-secondary-100 z-50 max-[425px]:pl-4">
      {screenWidth > 425 && <Home screenWidth={screenWidth} />}
      <div className="w-1/3 my-auto max-[800px]:w-1/2 max-[550px]:w-[60%] max-[425px]:w-[85%]">
        <SearchBar products={products} />
      </div>
      {screenWidth <= 800 && (
        <MobileHamburger
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          navigate={navigate}
          setCartModalOpen={setCartModalOpen}
          session={session}
          handleAccountClick={handleAccountClick}
          screenWidth={screenWidth}
        />
      )}
      {screenWidth > 800 && (
        <div className="my-auto mr-4 w-1/3 flex justify-end gap-8">
          <ShopIcon navigate={navigate} setCartModalOpen={setCartModalOpen} />
          <CartIcon setCartModalOpen={setCartModalOpen} />
          <AccountIcon
            handleAccountClick={handleAccountClick}
            session={session}
          />
        </div>
      )}
    </div>
  );
};

export default Header;

const Home = ({ screenWidth }: { screenWidth: number }) => {
  return (
    <Link
      to="/"
      className="
            flex items-center w-1/3 justify-start ml-4
            max-[800px]:w-[47px]
            max-[425px]:w-fit max-[425px]:items-start max-[425px]:ml-0"
    >
      {screenWidth <= 800 ? (
        <div className="">
          <FontAwesomeIcon
            className="h-[25px] text-primary-100"
            icon={faHome}
          />
          {screenWidth <= 425 && (
            <span
              className="
                        font-text text-xs text-primary-100
                        max-[800px]:text-lg max-[800px]:ml-2"
            >
              HOME
            </span>
          )}
        </div>
      ) : (
        <div
          className="
                    flex items-center justify-center text-primary-100 font-header text-5xl
                    max-[1100px]:text-4xl
                    max-[800px]:text-3xl"
        >
          Gallagher Bakes
        </div>
      )}
    </Link>
  );
};

const AccountIcon = ({
  handleAccountClick,
  session,
}: {
  handleAccountClick: () => void;
  session: User | null;
}) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center hover:opacity-80 hover:cursor-pointer duration-150
        max-[800px]:flex-row"
      onClick={() => handleAccountClick()}
    >
      <FontAwesomeIcon
        className={`h-[25px] ${!session ? "opacity-50" : "opacity-100"} text-primary-100`}
        icon={faCircleUser}
      />
      <span
        className="
            font-text text-xs text-primary-100
            max-[800px]:text-lg max-[800px]:ml-2"
      >
        {session ? "ACCOUNT" : "LOG IN"}
      </span>
    </div>
  );
};

const CartIcon = ({
  setCartModalOpen,
}: {
  setCartModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="
         flex flex-col items-center justify-center hover:opacity-80 hover:cursor-pointer duration-150
         max-[800px]:flex-row"
      onClick={() => setCartModalOpen(true)}
    >
      <FontAwesomeIcon
        className="h-[25px] text-primary-100"
        icon={faCartShopping}
      />
      <span
        className="
            font-text text-xs text-primary-100
            max-[800px]:text-lg max-[800px]:ml-2"
      >
        CART
      </span>
    </div>
  );
};

const ShopIcon = ({
  navigate,
  setCartModalOpen,
}: {
  setCartModalOpen: React.Dispatch<SetStateAction<boolean>>;
  navigate: any;
}) => {
  const handleShopClick = () => {
    setCartModalOpen(false);
    navigate("/shop");
  };

  return (
    <div
      className="
        flex flex-col items-center justify-center hover:opacity-80 hover:cursor-pointer duration-150
        max-[800px]:flex-row"
      onClick={handleShopClick}
    >
      <FontAwesomeIcon icon={faShop} className="h-[25px] text-primary-100" />
      <span
        className="
            font-text text-xs text-primary-100
            max-[800px]:text-lg max-[800px]:ml-2"
      >
        SHOP
      </span>
    </div>
  );
};

const MobileHamburger = ({
  setMenuOpen,
  menuOpen,
  navigate,
  setCartModalOpen,
  handleAccountClick,
  session,
  screenWidth,
}: {
  menuOpen: boolean;
  navigate: any;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccountClick: () => void;
  session: User | null;
  screenWidth: number;
}) => {
  const burgerMenuVariants = {
    initial1: {},
    open1: {
      rotate: "45deg",
      y: "185%",
    },
    initial2: {
      opacity: 1,
      transition: {
        duration: 0.05,
      },
    },
    open2: {
      opacity: 0,
      transition: {
        duration: 0.05,
      },
    },
    initial3: {},
    open3: {
      rotate: "-45deg",
      y: "-185%",
    },
  };

  return (
    <div className="hamburger relative" onClick={() => setMenuOpen(!menuOpen)}>
      <motion.div
        className="bar bg-primary-100"
        variants={burgerMenuVariants}
        initial="initial1"
        animate={menuOpen ? "open1" : "initial1"}
      ></motion.div>
      <motion.div
        className="bar bg-primary-100"
        variants={burgerMenuVariants}
        initial="initial2"
        animate={menuOpen ? "open2" : "initial2"}
      ></motion.div>
      <motion.div
        className="bar bg-primary-100"
        variants={burgerMenuVariants}
        initial="initial3"
        animate={menuOpen ? "open3" : "initial3"}
      ></motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="
                modal absolute bg-secondary-100 top-[60px] -right-8 w-[30vw] h-fit overflow-y-scroll max-h-[50vh] flex flex-col gap-4 p-4 z-50 rounded-2xl
                max-[440px]:w-[45vw]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <div className="flex flex-col items-start mt-4 gap-8">
              {screenWidth <= 425 && <Home screenWidth={screenWidth} />}
              <ShopIcon
                navigate={navigate}
                setCartModalOpen={setCartModalOpen}
              />
              <CartIcon setCartModalOpen={setCartModalOpen} />
              <AccountIcon
                handleAccountClick={handleAccountClick}
                session={session}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchBar = ({ products }: { products: SingularProduct[] | null }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SingularProduct[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const searchFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (searchText.length < 3) {
      setSearchModalOpen(false);
      setSearchResults([]);
      return;
    }

    setSearchModalOpen(true);

    const clickListener = (e: any): void => {
      if (searchFormRef.current && !searchFormRef.current.contains(e.target)) {
        setSearchModalOpen(false);
        setSearchResults([]);
        setSearchText("");
      }
    };

    document.addEventListener("click", clickListener);

    products?.forEach((product) => {
      product.name.toLowerCase().includes(searchText.toLowerCase())
        ? setSearchResults((prev) => [...prev, product])
        : null;
    });

    return () => document.removeEventListener("click", clickListener);
  }, [searchText]);

  return (
    <form ref={searchFormRef} className="mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-[.8rem] ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-secondary-100 focus:border-secondary-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary-100 dark:focus:border-secondary-100"
            placeholder="Search products..."
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-[.4rem] bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
        <AnimatePresence>
          {searchModalOpen && (
            <motion.div
              className="absolute w-full h-fit overflow-y-scroll max-h-[50vh] flex flex-col gap-4 p-4 bg-white z-50 rounded-2xl"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              {searchResults[0] ? (
                searchResults.map((product, idx) => {
                  return (
                    <Link
                      key={"search-" + idx}
                      to={`/shop/${product.slug}`}
                      onClick={() => setSearchModalOpen(false)}
                    >
                      <div className="flex w-inherit rounded items-center duration-200 hover:bg-primary-100 hover:bg-opacity-80">
                        <img
                          className="object-contain rounded h-24 w-24"
                          src={product.images[0].src}
                          alt=""
                        />
                        <p className="ml-4">{product.name}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p>Sorry, no results found...</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};
