import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Home = ({products}: {products: any[] | null}) => {
    return ( 
        <div className="w-[80%] mx-auto h-fit mt-16">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Shop at Gallagher Bakes</h2>
            <div className="
            h-fit w-full grid grid-cols-4
            ">
                {products && products.map((product, idx) => {
                    return(
                        <div key={idx} className="p-4 rounded flex flex-col">
                            <img className="rounded" src={product.images[0].src} alt="" />
                            <p className="text-secondary-100 font-text flex-1 flex font-bold items-start">{product.name}</p>
                            <div className="text-secondary-100 font-text text-sm mt-2" dangerouslySetInnerHTML={{__html: product.description}}></div>
                            <div className="mt-2 flex items-center justify-between">
                                <div className="text-secondary-100 font-text inline">£{product.price}</div>
                                <FontAwesomeIcon className="text-secondary-100 text-lg p-2 hover:cursor-pointer hover:opacity-80 duration-150" icon={faCartPlus} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Home;