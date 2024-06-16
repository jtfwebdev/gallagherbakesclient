import { useEffect, useState, useContext, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { BasketContext } from "../../App";
import { ScreenWidthContext } from "../../App";
import { BasketItem, SingularProduct } from "../Types";

const Product = ({
  products,
  setBasket,
}: {
  products: SingularProduct[] | null;
  setBasket: React.Dispatch<SetStateAction<BasketItem[]>>;
}) => {
  const productSlug = useParams();

  const [product, setProduct] = useState<SingularProduct>();

  const [quantity, setQuantity] = useState(1);

  const basket = useContext(BasketContext);

  const [buttonText, setButtonText] = useState("Add to basket");

  const screenWidth = useContext(ScreenWidthContext);

  useEffect(() => {
    if (products) {
      const prod = products.filter((x) => x.slug == productSlug.id);
      setProduct(prod[0]);
    }

    setQuantity(1);
  }, [products, productSlug]);

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handleAddToBasket = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();

    const existingProduct =
      product && basket.find((existing) => existing.id == product.id);

    if (existingProduct) {
      const index = basket.indexOf(existingProduct);

      const updatedBasket = structuredClone(basket);

      updatedBasket[index] = {
        id: product.id,
        quantity: existingProduct.quantity + quantity,
      };

      setBasket(() => updatedBasket);

      setButtonText("Added!");

      setTimeout(() => {
        setButtonText("Add to basket");
      }, 1500);
    } else {
      if (!product) return;

      const addProduct = {
        id: product && product.id,
        quantity: quantity,
      };

      setBasket((prev) => [...prev, addProduct]);

      setButtonText("Added!");

      setTimeout(() => {
        setButtonText("Add to basket");
      }, 1500);
    }
  };

  return (
    <>
      <div
        className="
            w-[70%] flex px-[2%] h-fit py-4 my-8 m-auto bg-white rounded font-text
            max-[1024px]:w-[85%]
            max-[530px]:w-[100%] max-[530px]:px-0 max-[530px]:py-0 max-[530px]:my-0"
      >
        {product && screenWidth > 768 ? (
          <FullScreenProduct
            product={product}
            buttonText={buttonText}
            handleAddToBasket={handleAddToBasket}
            quantity={quantity}
            handleDecrement={handleDecrement}
            setQuantity={setQuantity}
          />
        ) : (
          <MobileProduct
            product={product}
            buttonText={buttonText}
            handleAddToBasket={handleAddToBasket}
            quantity={quantity}
            handleDecrement={handleDecrement}
            setQuantity={setQuantity}
          />
        )}
      </div>
      <Divider />
    </>
  );
};

export default Product;

const FullScreenProduct = ({
  product,
  buttonText,
  handleAddToBasket,
  quantity,
  handleDecrement,
  setQuantity,
}: {
  product: any;
  buttonText: string;
  handleAddToBasket: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  quantity: number;
  handleDecrement: () => void;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex h-fit">
      <div className="h-fit">
        <img src={product.images[0].src} alt="" className="w-[25vw]" />
      </div>
      <div className="ml-4 font-text max-w-[60%] text-secondary-100 flex flex-col flex-1 h-inherit justify-between">
        <h2 className="text-4xl pb-2 font-bold border-b-2 border-secondary-100 w-fit">
          {product.name}
        </h2>
        <div className="flex-1 mt-8">
          <p className="font-bold">Product description</p>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
        <form className="flex items-center mt-4" onSubmit={handleAddToBasket}>
          <div className="flex items-center mr-4 gap-4">
            <FontAwesomeIcon
              icon={faMinus}
              className="text-secondary-100 text-2xl hover:cursor-pointer hover:opacity-50 duration-150"
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
              className="text-secondary-100 text-2xl hover:cursor-pointer hover:opacity-50 duration-150"
              onClick={() => setQuantity((prev) => prev + 1)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-full w-fit min-w-60 bg-secondary-100 font-text text-primary-100 text-2xl hover:opacity-80 hover:cursor-pointer duration-150"
          >
            <div className="select-none">{buttonText}</div>
          </button>
        </form>
      </div>
    </div>
  );
};

const MobileProduct = ({
  product,
  buttonText,
  handleAddToBasket,
  quantity,
  handleDecrement,
  setQuantity,
}: {
  product: any;
  buttonText: string;
  handleAddToBasket: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  quantity: number;
  handleDecrement: () => void;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col h-fit justify-center mx-auto max-w-full max-[530px]:pb-4">
      {product && (
        <>
          <div className="h-fit">
            <img
              src={product[0].images[0].src}
              alt=""
              className="w-[75vw] max-[530px]:w-full"
            />
          </div>
          <div className="mt-2 font-text text-secondary-100 flex flex-col flex-1 w-[75vw] max-[530px]:w-full max-[530px]:px-4">
            <h2 className="text-4xl pb-2 font-bold border-b-2 border-secondary-100 max-w-fit text-wrap">
              {product[0].name}
            </h2>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: product[0].description }}
            ></div>
          </div>
          <form
            className="flex items-center mt-4 max-w-fit max-[530px]:flex-col max-[530px]:items-start max-[530px]:px-4"
            onSubmit={handleAddToBasket}
          >
            <div className="flex items-center mr-4 gap-4">
              <FontAwesomeIcon
                icon={faMinus}
                className="text-secondary-100 text-2xl hover:cursor-pointer hover:opacity-50 duration-150"
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
                className="text-secondary-100 text-2xl hover:cursor-pointer hover:opacity-50 duration-150"
                onClick={() => setQuantity((prev) => prev + 1)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-full w-fit min-w-60 bg-secondary-100 font-text text-primary-100 text-2xl hover:opacity-80 hover:cursor-pointer duration-150 max-[530px]:mt-4"
            >
              <div className="select-none">{buttonText}</div>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

const Divider = () => {
  return (
    <div
      className="
    mt-8 w-[70%] mx-auto
    max-[1024px]:w-[85%]"
    >
      <div className="h-[6px] mb-[4px] w-full opacity-70 bg-secondary-100 rounded-full" />
      <div className="h-[6px] mb-[5px] w-full opacity-60 bg-secondary-100 rounded-full" />
      <div className="h-[5px] mb-[5px] w-full opacity-50 bg-secondary-100 rounded-full" />
      <div className="h-[5px] mb-[6px] w-full opacity-40 bg-secondary-100 rounded-full" />
      <div className="h-[4px] mb-[6px] w-full opacity-30 bg-secondary-100 rounded-full" />
    </div>
  );
};
