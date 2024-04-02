import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../Styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ScreenWidthContext } from '../../App';
import { SessionContext } from '../../App';

const Header = ({menuOpen, setMenuOpen, setLoginModalOpen, setCartModalOpen} : {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>, setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

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
            <Link to="/" className="my-auto ml-[10px]">
                <FontAwesomeIcon className="h-[35px] text-primary-100 hover:opacity-80 hover:cursor-pointer duration-150" icon={faHouse} />
            </Link>
            {location.pathname !== "/" ? 
                <div className="flex items-center justify-center text-primary-100 font-header text-5xl">Gallagher Bakes</div> 
                : null 
            }
            {screenWidth < 800 && <MobileHamburger setMenuOpen={setMenuOpen} menuOpen={menuOpen} />}
            <div className="my-auto mr-[10px] flex gap-4">
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