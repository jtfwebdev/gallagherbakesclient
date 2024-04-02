import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Featured = ({products}: {products: any[] | null}) => {

    

    return ( 
        <div className="
        w-[70%] mx-auto h-fit mt-16
        max-[900px]:w-[80%]
        max-[750px]:w-[90%]
        ">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Featured Products</h2>
            <div className="
            h-fit flex w-full
            max-[700px]:grid grid-cols-2
            ">
                {products && products.map((product, idx) => {

                    if (idx < 4) {
                        return (
                            <div key={idx} className="p-4 rounded flex flex-col">
                                <img className="rounded" src={product.images[0].src} alt="" />
                                <p className="text-secondary-100 font-text flex-1 flex items-center">{product.name}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="text-secondary-100 font-text inline">£{product.price}</div>
                                    <FontAwesomeIcon className="text-secondary-100 text-lg p-2 hover:cursor-pointer hover:opacity-80 duration-150" icon={faCartPlus} />
                                </div>
                            </div>
                        )
                    } else return;
                })}
            </div>
            <ShopMore />
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