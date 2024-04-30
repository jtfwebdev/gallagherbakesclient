import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Featured = ({products}: {products: any[] | null}) => {

    const navigate = useNavigate();

    const imgVars = {
        initial: {
            transition: {
                duration: .5
            }
        },
        hover: {
            scale: 1.1,  
            transition: {
                duration: .5
            }
        }
    }

    const textVars = {
        initial: {
            fontWeight: "normal"
        },
        hover: {
            fontWeight: "bold"
        }
    }

    const handleClick = (product) => {
        navigate(`/shop/${product}`)
    }

    return ( 
        <div className="
        w-[70%] mx-auto h-fit mt-16
        max-[900px]:w-[80%]
        max-[750px]:w-[90%]
        ">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Featured Products</h2>
            
            {products ? <div>
                <div className="
                h-fit flex w-full
                max-[700px]:grid grid-cols-2
                ">
                    {products.map((product, idx) => {

                        if (idx < 4) {
                            return (
                                <motion.div key={idx} className="p-4 rounded flex flex-col hover:cursor-pointer" initial="initial" whileHover="hover" onClick={() => handleClick(product.slug)}>
                                    <div className="overflow-hidden">
                                        <motion.img className="rounded" src={product.images[0].src} alt="" variants={imgVars}  />
                                    </div>
                                    <motion.p className="text-secondary-100 font-text flex-1 flex items-center" variants={textVars}>{product.name}</motion.p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-secondary-100 font-text inline">£{product.price}</div>
                                        <FontAwesomeIcon className="text-secondary-100 text-lg p-2 hover:cursor-pointer hover:opacity-80 duration-150" icon={faCartPlus} />
                                    </div>
                                </motion.div>
                            )
                        } else return;
                    })}
                </div>
                <ShopMore />
            </div>
            :
            <div className="
            h-fit flex w-full
            max-[700px]:grid grid-cols-2
            ">
                {Array.apply(null, new Array(4)).map((_, idx) => {
                    return <Skeleton key={"skeleton" + idx} />
                })}
            </div>
            }
        </div>
     );
}
 
export default Featured;

const ShopMore = () => {
    return (
        <div className="w-full mt-4 flex justify-center">
            <Link to="/shop">
                <button className="px-4 py-2 rounded-full bg-secondary-100 font-text text-primary-100 text-2xl hover:opacity-80 hover:cursor-pointer duration-150">
                    Shop more
                </button>
            </Link>
            
        </div>
        
    )
}

const Skeleton = () => {
    return (
        <div role="status" className="w-full h-fit animate-pulse">
            <div className="p-4 rounded h-fit flex flex-col hover:cursor-pointer">
                <div className="rounded w-full aspect-square bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-2.5 mt-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}