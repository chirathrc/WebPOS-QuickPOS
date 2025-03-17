import beep from '../../assets/beep-29.mp3';
import ProductItemType from '../../types/ProductItem';
import burger from '../../assets-new/burger.jpeg';

function ProductItem(props: ProductItemType) {
    const isOutOfStock = props.product.qty === 0;

    return (
        <div
            role="button"
            onClick={() => {
                // if (!isOutOfStock) {
                props.onSelect(props.product);
                const sound = new Audio(beep);
                sound.play();
                // }
            }}
            className={`select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow-lg 
            ${isOutOfStock ? 'border-2 border-red-500' : 'hover:shadow-xl hover:bg-green-100'} 
            ${isOutOfStock ? 'hover:border-red-600' : ''}`} // Red hover border if out of stock
            style={{
                opacity: isOutOfStock ? 0.7 : 1, // Slightly faded if out of stock
            }}
        >
            <img
                src={`http://localhost:8080/files/${props.product.id}.png`}
                alt={props.product.name}
                className="w-full h-40 object-cover rounded-t-2xl"
                style={{
                    filter: isOutOfStock ? 'grayscale(100%)' : 'none', // Grayscale effect when out of stock
                }}
            />

            <div className="pb-3 px-3 text-sm mt-2 flex flex-col md:flex-row md:justify-between">
                <p className={`flex-grow truncate mr-1 ${isOutOfStock ? 'text-red-500' : ''}`}>
                    {props.product.name}
                </p>
                <p className={`nowrap font-semibold md:mt-0 mt-1 ${isOutOfStock ? 'text-red-500' : 'text-gray-800'}`}>
                    Rs. {props.product.price}
                </p>
            </div>


        </div>
    );
}

export default ProductItem;
