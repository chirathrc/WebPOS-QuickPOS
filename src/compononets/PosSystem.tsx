import { useEffect, useState } from 'react';
import ProductMenu from './sub/ProductMenu';
import ProductSearch from './sub/ProductSearch';
import Cart from './sub/Cart';
import Checkout from './sub/Checkout';
import button from '../assets/button-21.mp3';
import Receipt from './sub/Receipt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, Router, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

function PosSystem() {
    // Initialize state for the app's POS features

    const { logout, isAuthenticated, jwtToken } = useAuth();

    const initItems: any[] = [];
    const [searchKey, setSearchKey] = useState('');
    const [cartItems, setCartItems] = useState(initItems);
    const [showReceipt, setShowReceipt] = useState(false);
    const [cash, setCash] = useState(0);

    const [permission, setPermission] = useState<boolean>(false);

    const [products, setProducts] = useState<any[]>([]); // products List change two


    const [isUpdated, setIsUpdated] = useState(false);

    const [user, setUser] = useState("");

    const navigate = useNavigate();


    const getUsreDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getUsreDetails", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });


            if (response.status === 200) {
                setUser(response.data.firstName + " " + response.data.lastName);
                console.log(response.data);
                if (response.data.userType.id == 1) {
                    setPermission(true);
                }
            } else {
                navigate("/auth/login");
            }


            // if (response.status == 200) {
            //     // console.log(response.data);
            //     setUser(response.data.firstName + " " + response.data.lastName);
            // } else {
            //     navigate("/auth/login");
            // }

        } catch (error) {
            console.error("Error fetching user data:", error);
            navigate("/auth/login"); // Redirect in case of any errors
        }
    };

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getProductItems", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            // console.log(response.data);

            setProducts(response.data); // Set the products state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(
        () => {
            if (isAuthenticated) {
                getUsreDetails();
                getProducts();
                setIsUpdated(true);
            }
        }, [isAuthenticated, isUpdated]
    );


    // Handle sign out logic
    const handleSignOut = () => {
        logout();
    };

    return (
        <>
            <div className="hide-print flex flex-col md:flex-row h-screen antialiased text-gray-800">
                <div className="flex flex-row w-full md:w-auto flex-shrink-0 pl-4 pr-2 py-4">
                    <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-green-600 rounded-3xl">

                        <div className='text-center cursor-pointer' onClick={() => {
                            if (permission) {
                                navigate("/POSDashBoard");
                            } else {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Permission Error",
                                    text: "You don't have permission to access this page.",
                                });
                            }

                        }} >
                            <FontAwesomeIcon icon={faBox} className="text-white text-2xl mb-1 mt-7 " />

                            <span className="text-white text-sm">Dashboard</span>
                        </div>


                        {/* Sign Out Button with icon - visible only on larger screens */}
                        <button
                            onClick={handleSignOut}
                            className="mt-6 md:block hidden text-white text-center  hover:bg-green-700 rounded-full px-4 py-2 transition"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="text-white text-2xl mb-1" />
                            <span className="text-white text-sm">Sign Out</span>
                        </button>
                    </div>
                </div>

                {/* Main POS system layout */}
                <div className="flex-grow flex flex-col md:flex-row">
                    <div className="flex flex-col bg-green-50 h-full w-full md:w-7/12 py-4">
                        {/* Product Search Component */}
                        <ProductSearch onSearch={(searchKey: string) => setSearchKey(searchKey)} />
                        <div className="h-full overflow-hidden mt-4">
                            <ProductMenu
                                searchKey={searchKey}
                                onSelect={(product: any) => {

                                    if (product.qty != 0) {
                                        let found = false;
                                        for (let i = 0; i < cartItems.length; i++) {
                                            if (cartItems[i].product.id === product.id) {
                                                if (cartItems[i].quantity === product.qty || product.qty == 0) {

                                                    Swal.fire({
                                                        icon: "info",
                                                        title: "Maximum QTY Reached!",
                                                        text: "Availble Quintity is " + product.qty,
                                                    });

                                                    found = true;
                                                } else {
                                                    cartItems[i].quantity += 1;
                                                    found = true;
                                                }

                                            }
                                        }

                                        if (!found) {
                                            cartItems.push({ product, quantity: 1 });
                                        }

                                        setCartItems([...cartItems]);

                                    }


                                }}
                                isUpdate={isUpdated}
                                productList={products}
                            />
                        </div>
                    </div>

                    <div className="md:w-5/12 flex flex-col bg-green-50 h-full pr-4 pl-2 py-4">
                        <div className="bg-white rounded-3xl flex flex-col h-full shadow">
                            <div className="flex-1 flex flex-col overflow-auto">
                                <div className="h-16 text-center flex justify-center">
                                    {cartItems.length !== 0 && (
                                        <>
                                            <div className="pl-8 text-left text-lg py-4 relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                </svg>
                                                <div className="text-center absolute bg-green-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                                                    {cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}
                                                </div>
                                            </div>
                                            <div className="flex-grow px-8 text-right text-lg py-4 relative">
                                                <button onClick={() => {
                                                    setCartItems([]);
                                                    const sound = new Audio();
                                                    sound.src = button;
                                                    sound.play();
                                                }} className="text-green-300 hover:text-green-600 focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <Cart items={cartItems} onCartUpdate={(newCartItems: any) => setCartItems(newCartItems)} />
                            </div>
                            <Checkout
                                items={cartItems}
                                onSubmit={(cash: number) => {
                                    setCash(cash);
                                    setShowReceipt(true);
                                }}
                                userName={user}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile-only sign out button */}
                <div className="fixed bottom-4 left-4 md:hidden">
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white rounded-full px-4 py-2 shadow hover:bg-red-600"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Sign Out
                    </button>
                </div>

                {/* Receipt display component */}
                {showReceipt && (
                    <Receipt
                        cash={cash}
                        items={cartItems}
                        onProceed={async () => {
                            // const receiptContent: any = document.getElementById('receipt-content');
                            // const printArea: any = document.getElementById('print-area');
                            // printArea.innerHTML = receiptContent.innerHTML;
                            // window.print();
                            // printArea.innerHTML = '';
                            // setShowReceipt(false);
                            // setCartItems([]);
                            // const sound = new Audio();
                            // sound.src = button;
                            // sound.play();

                            const productCartItems = cartItems;
                            // console.log(cartItems);

                            const response = await axios.post("http://localhost:8080/buyProduct", productCartItems, {
                                headers: {
                                    Authorization: `Bearer ${jwtToken}`,
                                },
                            });

                            if (response.data) {
                                setShowReceipt(false);
                                setCartItems([]);
                                const sound = new Audio();
                                sound.src = button;
                                sound.play();
                                setIsUpdated(false);
                            }

                        }}
                        onClose={() => setShowReceipt(false)}
                    />
                )}
            </div>
            <div id="print-area" className="print-area"></div>
        </>
    );
}

export default PosSystem;
