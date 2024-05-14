import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Popular = ({products}) => {

    const navigate = useNavigate();

    const productSlug = useParams();

    const handleClick = (slug) => {
        navigate(`/shop/${slug}`)
    }

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

    return (
        <div className="w-[70%] h-[30vh] mx-auto mt-8">
            <h3 className="text-secondary-100 font-header text-5xl text-center">Customer favourites...</h3>
            {products && <div className="flex">
                {products.filter((x) => x.slug !== productSlug.id).map((product, idx) => {
                    if (idx < 5) {
                        return (
                            <motion.div key={idx} className="p-4 rounded flex flex-col w-[20%] hover:cursor-pointer" initial="initial" whileHover="hover" onClick={() => handleClick(product.slug)}>
                                <div className="overflow-hidden">
                                    <motion.img className="rounded" variants={imgVars} src={product.images[0].src} alt="" />
                                </div>
                                <motion.p className="text-secondary-100 font-text flex-1 flex font-bold items-start" variants={textVars}>{product.name}</motion.p>
                                <div className="text-secondary-100 font-text text-sm mt-2" dangerouslySetInnerHTML={{__html: product.description}}></div>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="text-secondary-100 font-text inline">£{product.price}</div>
                                </div>
                            </motion.div>
                        )
                    }
                })}
            </div>}
        </div>
     );
}
 
export default Popular;