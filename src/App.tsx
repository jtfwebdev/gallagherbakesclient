import { useEffect, useState, createContext } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./assets/Components/Header";
import FetchProducts from './assets/Hooks/FetchProducts';
import Home from "./assets/Components/Home";
import Shop from "./assets/Components/Shop";
import RoutingError from "./assets/Components/RoutingError";
import LoginRegisterModal from "./assets/Components/LoginRegisterModal";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./assets/Components/ScrollToTop";
import Cart from "./assets/Components/Cart";
import AccountPage from "./assets/Components/AccountPage";
import axios from "axios";
import Product from "./assets/Components/Product";
import Popular from "./assets/Components/Popular";
import Checkout from "./assets/Components/Checkout";

export const ScreenWidthContext = createContext(window.innerWidth);
export const SessionContext = createContext(null);
export const BasketContext = createContext([]);

function App() {

  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [basket, setBasket] = useState([]);
  const [basketTotal, setBasketTotal] = useState<string>("0");

  useEffect(() => {
    const watchWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    if (localStorage.getItem('token')) {

      const payload = {
        token: localStorage.getItem('token'), 
      }

      const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
      }

      axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        params: {
          headers: headers,
          query: payload
        }})
        .then((res) => {
          setSessionDetails(res.data.userDetails[0][0])
        })
        .catch((err) => {
          console.log(err)
        })
    }

    window.addEventListener("resize", watchWidth);

    return () => {
      window.removeEventListener("resize", watchWidth);
    }
  }, [])

  useEffect(() => {
    const watchStorage = () => {
      if (!localStorage.getItem('token')) {
        setSessionDetails(null)
      }
    }

    window.addEventListener("storage", watchStorage);
    return () => window.removeEventListener("storage", watchStorage)
  }, [])

  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const [products, setProducts] = useState<any[] | null>(null);

  useEffect(() => {
    FetchProducts(setProducts);
  }, [])

  return(
    <>
      <SessionContext.Provider value={sessionDetails}>
      <ScreenWidthContext.Provider value={screenWidth}>
      <BasketContext.Provider value={basket}>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} setLoginModalOpen={setLoginModalOpen} setCartModalOpen={setCartModalOpen} products={products} />
        <AnimatePresence>
          {loginModalOpen && <LoginRegisterModal setLoginModalOpen={setLoginModalOpen} setSessionDetails={setSessionDetails} />}
        </AnimatePresence>
        <AnimatePresence>
          {cartModalOpen && <Cart setCartModalOpen={setCartModalOpen} products={products} setBasket={setBasket} setBasketTotal={setBasketTotal} basketTotal={basketTotal} />}
        </AnimatePresence>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home products={products} />}></Route>
          <Route path="/shop" element={<Shop products={products} />} ></Route>
          <Route path="/shop/:id" element={
            <>
              <Product products={products} setBasket={setBasket} />
              <Popular products={products} />
            </>
          }></Route>
          <Route path="/checkout" element={<Checkout basketTotal={basketTotal} />}></Route>
          <Route path="/myaccount" element={<AccountPage setSessionDetails={setSessionDetails} />}></Route>
          <Route path="*" element={<RoutingError />}></Route>
        </Routes>
      </BasketContext.Provider>
      </ScreenWidthContext.Provider>
      </SessionContext.Provider>
    </>
  )
}

export default App