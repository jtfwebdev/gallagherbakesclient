import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SingularProduct } from "../Types";

const Popular = ({ products }: { products: SingularProduct[] | null }) => {
  const navigate = useNavigate();

  const productSlug = useParams();

  const handleClick = (slug: string) => {
    navigate(`/shop/${slug}`);
  };

  const imgVars = {
    initial: {
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const textVars = {
    initial: {
      fontWeight: "normal",
    },
    hover: {
      fontWeight: "bold",
    },
  };

  return (
    <div
      className="
        w-[70%] mx-auto mt-8
        max-[1024px]:w-[85%]
        max-[530px]:w-[98%]"
    >
      <h3 className="text-secondary-100 font-header text-5xl text-center max-[432px]:text-4xl max-[324px]:text-3xl">
        Customer favourites...
      </h3>
      {products && (
        <div className="flex max-[768px]:grid grid-cols-2">
          {products
            .filter((x) => x.slug !== productSlug.id)
            .map((product, idx) => {
              if (idx <= 3) {
                return (
                  <motion.div
                    key={idx}
                    className="p-4 rounded flex flex-col w-[25%] hover:cursor-pointer max-[768px]:w-full max-[530px]:p-2"
                    initial="initial"
                    whileHover="hover"
                    onClick={() => handleClick(product.slug)}
                  >
                    <div className="overflow-hidden">
                      <motion.img
                        className="rounded"
                        variants={imgVars}
                        src={product.images[0].src}
                        alt=""
                      />
                    </div>
                    <motion.p
                      className="text-secondary-100 font-text flex-1 flex font-bold items-start"
                      variants={textVars}
                    >
                      {product.name}
                    </motion.p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-secondary-100 font-text inline">
                        £{product.price}
                      </div>
                    </div>
                  </motion.div>
                );
              }
            })}
        </div>
      )}
    </div>
  );
};

export default Popular;
