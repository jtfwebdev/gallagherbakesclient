import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = ({products}: {products: any[] | null}) => {

    const navigate = useNavigate();

    const handleClick = (product) => {
        navigate(`/shop/${product}`)
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
        <div className="
        w-[80%] mx-auto h-fit mt-16
        max-[1100px]:w-[95%]
        max-[425px]:w-[98%]
        ">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Shop at Gallagher Bakes</h2>
            <div className="
            h-fit w-full grid grid-cols-4
            max-[800px]:grid-cols-2
            ">
                {products && products.map((product, idx) => {
                    return(
                        <motion.div key={idx} className="p-1 py-4 rounded flex flex-col hover:cursor-pointer" initial="initial" whileHover="hover" onClick={() => handleClick(product.slug)}>
                            <div className="overflow-hidden">
                                <motion.img className="rounded" variants={imgVars} src={product.images[0].src} alt="" />
                            </div>
                            <motion.p className="text-secondary-100 font-text flex-1 flex font-bold text-xl items-start" variants={textVars}>{product.name}</motion.p>
                            <div className="text-secondary-100 font-text text-sm mt-2" dangerouslySetInnerHTML={{__html: product.description}}></div>
                            <div className="mt-2 flex items-center justify-between">
                                <div className="text-secondary-100 font-text inline">£{product.price}</div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Home;