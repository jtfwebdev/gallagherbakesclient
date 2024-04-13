const Popular = ({products}) => {

    const handleClick = (slug) => {

    }

    return ( 
        <div className="w-[70%] h-[30vh] mx-auto mt-8">
            <h3 className="text-secondary-100 font-header text-5xl text-center">Customer favourites...</h3>
            {products && <div className="flex">
                {products.map((product, idx) => {
                    if (idx < 5) {
                        return (
                            <div key={idx} className="p-4 rounded flex flex-col w-[20%]" onClick={() => handleClick(product.slug)}>
                                <img className="rounded" src={product.images[0].src} alt="" />
                                <p className="text-secondary-100 font-text flex-1 flex font-bold items-start">{product.name}</p>
                                <div className="text-secondary-100 font-text text-sm mt-2" dangerouslySetInnerHTML={{__html: product.description}}></div>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="text-secondary-100 font-text inline">£{product.price}</div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>}
        </div>
     );
}
 
export default Popular;