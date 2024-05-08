import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import '../Styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ScreenWidthContext } from '../../App';
import { SessionContext } from '../../App';

const Header = ({menuOpen, setMenuOpen, setLoginModalOpen, setCartModalOpen, products} : {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>, setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>, products: any[] | null}) => {
``
    const location = useLocation();
    const screenWidth = useContext(ScreenWidthContext);
    const session = useContext(SessionContext);
    const navigate = useNavigate();

    const handleAccountClick = () => {
        if (!session) {setLoginModalOpen(true)}
        else navigate('/myaccount');
    }

    return ( 
        <div className="w-full flex justify-between h-16 bg-secondary-100">
            <Link to="/" className="flex items-center w-1/3 justify-start ml-4" ><div className="flex items-center justify-center text-primary-100 font-header text-5xl">Gallagher Bakes</div></Link>
            <div className="w-1/3 my-auto">
                <SearchBar products={products} />
            </div>
            {screenWidth < 800 && <MobileHamburger setMenuOpen={setMenuOpen} menuOpen={menuOpen} />}
            <div className="my-auto mr-4 w-1/3 flex justify-end gap-8">
                <FontAwesomeIcon onClick={() => setCartModalOpen((prev) => !prev)} className="h-[35px] text-primary-100 hover:opacity-80 hover:cursor-pointer duration-150" icon={faCartShopping} />
                <FontAwesomeIcon onClick={() => handleAccountClick()} className={`h-[35px] ${(!session) ? "opacity-50" : "opacity-100" } text-primary-100 hover:opacity-80 hover:cursor-pointer duration-150`} icon={faCircleUser} />
            </div>
        </div>
     );
}

export default Header;

const MobileHamburger = ({setMenuOpen, menuOpen} : {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const burgerMenuVariants = {
        initial1: {

        },
        open1: {
            rotate: "45deg",
            y: "185%"
        },
        initial2: {
            opacity: 1,
            transition: {
                duration: 0.05
            }
        },
        open2: {
            opacity: 0,
            transition: {
                duration: 0.05
            }
        },
        initial3: {

        },
        open3: {
            rotate: "-45deg",
            y: "-185%"
        }
    }

    return(
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <motion.div className="bar bg-primary-100" variants={burgerMenuVariants} initial="initial1" animate={menuOpen ? "open1" : "initial1"}></motion.div>
            <motion.div className="bar bg-primary-100" variants={burgerMenuVariants} initial="initial2" animate={menuOpen ? "open2" : "initial2"}></motion.div>
            <motion.div className="bar bg-primary-100" variants={burgerMenuVariants} initial="initial3" animate={menuOpen ? "open3" : "initial3"}></motion.div>
        </div>
    )
}

const SearchBar = ({products} : {products: any[] | null}) => {

    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
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
        }

        document.addEventListener("click", clickListener);

        products?.forEach((product) => {
            product.name.toLowerCase().includes(searchText.toLowerCase()) ? setSearchResults((prev) => [...prev, product]) : null;
        })

        return () => document.removeEventListener("click", clickListener);

    }, [searchText]);

    return (
        <form ref={searchFormRef} className="max-w-md mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-secondary-100 focus:border-secondary-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary-100 dark:focus:border-secondary-100" placeholder="Search products..." required value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
                <AnimatePresence>
                    {searchModalOpen && 
                        <motion.div className="absolute w-full h-fit overflow-y-scroll max-h-[50vh] flex flex-col gap-4 p-4 bg-white z-50 rounded-2xl" initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -30}} >
                            {searchResults[0] ? searchResults.map((product) => {
                                return (
                                    <Link to={`/shop/${product.slug}`} onClick={() => setSearchModalOpen(false)}>
                                        <div className="flex w-inherit items-center">
                                            <img className="object-contain rounded h-32 w-32" src={product.images[0].src} alt="" />
                                            <p className="ml-4">{product.name}</p>
                                        </div>
                                    </Link>
                                    )
                                }) :
                                <p>Sorry, no results found...</p>
                                }
                        </motion.div>}
                </AnimatePresence>
            </div>
        </form>

    )
}