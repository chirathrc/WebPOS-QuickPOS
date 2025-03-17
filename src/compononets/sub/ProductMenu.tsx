import { useEffect, useState } from 'react';
import ProductItem from './ProductItem'; // Ensure this import is correct based on your file structure
import ProductmenuTypes from '../../types/ProductMenuTypes';

function ProductMenu(props: ProductmenuTypes) {
    const [products, setProducts] = useState<any[]>([]); // Initialize state for products
    // const { isAuthenticated, jwtToken } = useAuth();

    useEffect(() => {
        setProducts(props.productList);
    });

    // const getProducts = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8080/getProductItems", {
    //             headers: {
    //                 Authorization: `Bearer ${jwtToken}`,
    //             },
    //         });

    //         // console.log(response.data);

    //         setProducts(response.data); // Set the products state with fetched data
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         getProducts();
    //     }
    // }, [isAuthenticated,props.isUpdate]); // Depend on isAuthenticated to refetch if it changes

    return (
        <div className="h-full overflow-y-auto px-2">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 pb-3">
                {
                    products
                        .filter(product => !props.searchKey || product.name.toLowerCase().includes(props.searchKey.toLowerCase()))
                        .map((product, index) => (
                            <ProductItem key={index} product={product} onSelect={props.onSelect} />
                        ))
                }
            </div>
        </div>
    );
    
}

export default ProductMenu;
