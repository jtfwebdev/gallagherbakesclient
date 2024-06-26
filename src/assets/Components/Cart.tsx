import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrashCan,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ScreenWidthContext } from "../../App";
import { SingularProduct, BasketItem } from "../Types";

const Cart = ({
  setCartModalOpen,
  products,
  setBasket,
  basketTotal,
  setBasketTotal,
}: {
  setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: SingularProduct[] | null;
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  basketTotal: string;
  setBasketTotal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const basket = useContext(BasketContext);
  const screenWidth = useContext(ScreenWidthContext);

  const cartPanelRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartModalOpen(false);
    navigate("/checkout");
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        screenWidth > 800 &&
        cartPanelRef.current &&
        !cartPanelRef.current.contains(event.target as Node) // type casting necessary as MouseEvent does not define target as a Node
      ) {
        setCartModalOpen(false);
      }
    };

    setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 500);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!products) return;

    let price = "";
    basket.forEach((item) => {
      const product = products.filter((prod) => prod.id == item.id);
      price += parseFloat(product[0].price) * item.quantity;
    });
    setBasketTotal(price);
  }, [basket]);

  return (
    <motion.div
      className="
        fixed z-40 h-full w-full py-2 flex items-center justify-center inset-x-0 inset-y-0 bg-transparent backdrop-blur
        max-[900px]:inset-y-16 max-[900px]:items-start max-[900px]:py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        ref={cartPanelRef}
        className="
            w-[80%] h-[80%] flex flex-col overflow-y-scroll px-8 py-4 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700
            max-[900px]:w-[100%] max-[900px]:min-h-[95%] max-[900px]:rounded-none max-[900px]:px-2"
      >
        <div className="flex justify-between mb-4">
          <h2 className="font-text text-secondary-100 text-2xl border-b-2 border-secondary-100 w-fit">
            {screenWidth > 440 ? "Your shopping cart" : "Shopping cart"}
          </h2>
          <div
            className="flex items-center gap-2 hover:cursor-pointer hover:opacity-80"
            onClick={() => setCartModalOpen(false)}
          >
            <FontAwesomeIcon
              icon={faAnglesLeft}
              className="text-3xl text-secondary-100"
            />
            <span className="font-text text-secondary-100 text-xl">
              {screenWidth > 440 ? "Close cart" : "Close"}
            </span>
          </div>
        </div>

        <div className="h-full">
          {basket && basket[0] && (
            <div className="flex flex-col h-full gap-4">
              {screenWidth > 500
                ? basket.map((product, idx) => {
                    return (
                      <AnimatePresence key={"cart-full-screen" + idx}>
                        <CartProduct
                          products={products}
                          product={product}
                          basket={basket}
                          setBasket={setBasket}
                        />
                      </AnimatePresence>
                    );
                  })
                : basket.map((product, idx) => {
                    return (
                      <AnimatePresence key={"card-mobile" + idx}>
                        <MobileCartProduct
                          products={products}
                          product={product}
                          basket={basket}
                          setBasket={setBasket}
                        />
                      </AnimatePresence>
                    );
                  })}
              <div className="flex flex-col flex-1 justify-end items-end pb-4">
                <div>Subtotal: {basketTotal}</div>
                <div>Postage & packaging: £{3.99}</div>
                <div>{`Grand total: £${parseFloat(basketTotal) + 3.99}`}</div>
                <button
                  onClick={handleCheckout}
                  className="w-fit mt-4 text-white bg-secondary-100 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-secondary-100 font-medium rounded-lg text-lg px-10 py-2.5 text-center dark:bg-secondary-100 dark:hover:bg-secondary-100 dark:focus:ring-primary-800"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
          {basket && !basket[0] && (
            <div>
              <h3>You don't have any products in your basket.</h3>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;

const CartProduct = ({
  products,
  product,
  basket,
  setBasket,
}: {
  products: SingularProduct[] | null;
  product: BasketItem;
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const productDetails = products?.filter((x) => x.id == product.id);

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prev: number) => prev - 1);
  };

  const handleDeleteFromCart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const productToDelete = basket.find((x) => x.id == product.id);

    const updatedBasket = basket.filter((item) => item !== productToDelete);

    setBasket(() => updatedBasket);
  };

  useEffect(() => {
    const productToUpdate = basket.find((x) => x.id == product.id);

    if (productToUpdate) {
      const index = basket.indexOf(productToUpdate);

      const updatedBasket = structuredClone(basket);

      updatedBasket[index] = {
        id: product.id,
        quantity: quantity,
      };

      setBasket(() => updatedBasket);
    }
  }, [quantity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      className="individual_cart_product flex border-b-2 border-secondary-100 border-opacity-10 pb-4"
    >
      {productDetails && (
        <>
          <img
            className="w-44 max-[600px]:w-32"
            src={productDetails[0].images[0].src}
            alt=""
          />
          <div className="pl-4 flex flex-1 items-center justify-between">
            <div className="w-[40%] mr-4 text-wrap">
              {productDetails[0].name}
            </div>
            <div>£{productDetails[0].price} each</div>
            <div className="flex items-center justify-center max-[600px]:flex-col max-[600px]:ml-2">
              <div className="flex items-center mr-4 gap-4">
                <FontAwesomeIcon
                  icon={faMinus}
                  className="text-secondary-100 text-2xl hover:opacity-60 hover:cursor-pointer duration-100"
                  onClick={handleDecrement}
                />
                <input
                  type="number"
                  value={quantity}
                  className="bg-gray-50 border border-gray-300 w-12 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-secondary-100 text-2xl hover:opacity-60 hover:cursor-pointer duration-100"
                  onClick={() => setQuantity((prev) => prev + 1)}
                />
              </div>
              <div
                className="text-red-400 hover:text-red-200 hover:cursor-pointer duration-100 max-[600px]:mt-2"
                onClick={handleDeleteFromCart}
              >
                Remove{" "}
                <FontAwesomeIcon icon={faTrashCan} className="text-inherit" />
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

const MobileCartProduct = ({
  products,
  product,
  basket,
  setBasket,
}: {
  products: SingularProduct[] | null;
  product: BasketItem;
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const productDetails = products?.filter((x) => x.id == product.id);

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prev: number) => prev - 1);
  };

  const handleDeleteFromCart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const productToDelete = basket.find((x) => x.id == product.id);

    const updatedBasket = basket.filter((item) => item !== productToDelete);

    setBasket(() => updatedBasket);
  };

  useEffect(() => {
    const productToUpdate = basket.find((x) => x.id == product.id);

    if (productToUpdate) {
      const index = basket.indexOf(productToUpdate);

      const updatedBasket = structuredClone(basket);

      updatedBasket[index] = {
        id: product.id,
        quantity: quantity,
      };

      setBasket(() => updatedBasket);
    }
  }, [quantity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      className="individual_cart_product flex border-b-2 border-secondary-100 border-opacity-10 pb-4"
    >
      {productDetails && (
        <>
          <div className="flex flex-col items-center justify-center w-fit">
            <img
              className="w-44 max-[600px]:w-28"
              src={productDetails[0].images[0].src}
              alt=""
            />
            <div className="max-w-28 text-wrap text-sm font-bold text-center">
              {productDetails[0].name}
            </div>
          </div>
          <div className="pl-4 flex flex-1 items-center justify-between">
            <div>£{productDetails[0].price} each</div>
            <div className="flex items-center justify-center max-[600px]:flex-col max-[600px]:ml-2">
              <div className="flex items-center mr-4 gap-4 max-[375px]:gap-2">
                <FontAwesomeIcon
                  icon={faMinus}
                  className="text-secondary-100 text-2xl hover:opacity-60 hover:cursor-pointer duration-100 max-[375px]:text-lg"
                  onClick={handleDecrement}
                />
                <input
                  type="number"
                  value={quantity}
                  className="bg-gray-50 border border-gray-300 w-12 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-100 focus:border-secondary-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-secondary-100 text-2xl hover:opacity-60 hover:cursor-pointer duration-100 max-[375px]:text-lg"
                  onClick={() => setQuantity((prev) => prev + 1)}
                />
              </div>
              <div
                className="text-red-400 hover:text-red-200 hover:cursor-pointer duration-100 max-[600px]:mt-2"
                onClick={handleDeleteFromCart}
              >
                Remove{" "}
                <FontAwesomeIcon icon={faTrashCan} className="text-inherit" />
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};
