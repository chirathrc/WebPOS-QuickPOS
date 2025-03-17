import { useEffect, useState } from 'react';
import ProductMenu from './sub/ProductMenu';
import ProductSearch from './sub/ProductSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import UserListModal from './sub/UserListModel';

function Dashboard() {

    const { logout, isAuthenticated, jwtToken } = useAuth(); // Assuming `user` contains name and position

    const [catList, setCatList] = useState<any[]>([]);
    const [userTypeList, setUserTypeList] = useState<any[]>([]);

    const navigate = useNavigate();

    const [searchKey, setSearchKey] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const [user, setUser] = useState<any>({});
    const [userPosition, setUserPosition] = useState<string>("");

    const [products, setProducts] = useState<any>([]); // products List change two

    const [isUpdated, setIsUpdated] = useState(false);
    const [productQty, setProductQty] = useState<any>();

    //Add Product Details
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<any>(null);
    const [newProductQty, setNewProductQty] = useState<any>(null);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [catgoryId, setCategoryId] = useState<any>(0);


    //Add New User
    const [userFirstName, setFirstName] = useState<any>('');
    const [userLastName, setLastName] = useState<any>('');
    const [userEmail, setEmail] = useState<any>('');
    const [userPassword, setPassword] = useState<any>('');
    const [positionId, setPositionId] = useState<any>(0);

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [isUserListModalVisible, setIsUserListModalVisible] = useState(false);
    const [userList, setUserList] = useState<any[]>([]);


    const handleRemoveUser = async (id: number) => {


        try {

            let response = await axios.get("http://localhost:8080/removeUser/" + id, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.data == "SuccessFull Removed") {
                setIsUpdated(false);

                Swal.fire({
                    icon: "success",
                    title: "Succesfull",
                    text: "User Removed Suucessfull",
                });

                
            }

        } catch (error) {

            console.log(error);
            navigate("/auth/login");


        }

    };


    const getUsreDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getUsreDetails", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            setUser(response.data);
            setUserPosition(response.data.userType.type);

        } catch (error) {
            navigate("/auth/login");
            console.error('Error fetching products:', error);
        }
    };

    const getTotal = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getTotalIncome", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            setTotalIncome(response.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getCategories", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            setCatList(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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


    const getPositions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getPositions", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            // console.log(response.data);

            setUserTypeList(response.data); // Set the products state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            // console.log(response.data);

            setUserList(response.data); // Set the products state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
        }

    }



    useEffect(
        () => {
            if (isAuthenticated) {
                getUsreDetails();
                getProducts();
                getCategories();
                getPositions();
                getTotal();
                getAllUsers();
                setIsUpdated(true);
            }
        }, [isAuthenticated, isUpdated]
    );

    const handleAddProduct = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleAddEmployee = () => {
        setIsEmployeeModalVisible(true);
    };

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsProductModalVisible(true);
        setProductQty(product.qty);
    };

    return (
        <>
            <div className="hide-print flex flex-col md:flex-row h-screen antialiased text-blue-gray-800">
                {/* Sidebar */}
                <div className="flex flex-row w-full md:w-auto flex-shrink-0 pl-4 pr-2 py-4">
                    <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl shadow-lg">
                        <Link to={"/"}>
                            <FontAwesomeIcon icon={faBox} className="text-white text-2xl mb-2 mt-7" />
                        </Link>
                        <span className="text-white text-sm">POS</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow flex flex-col md:flex-row">
                    <div className="flex flex-col bg-blue-gray-50 h-full w-full md:w-7/12 py-4">
                        <ProductSearch onSearch={(searchKey: string) => setSearchKey(searchKey)} />
                        <div className="h-full overflow-hidden mt-4">
                            <ProductMenu searchKey={searchKey} onSelect={handleProductClick} isUpdate={true} productList={products} />
                        </div>
                    </div>

                    <div className="md:w-5/12 flex flex-col bg-white h-full pr-4 pl-2 py-4">
                        {/* User Info Area */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-gray-800">
                                <h2 className="text-xl font-bold">{user?.firstName + " " + user.lastName || 'Guest User'}</h2>
                                <p className="text-sm text-gray-500">{userPosition || 'Position not available'}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>

                        {/* Total Income Box */}
                        <div className="flex justify-center items-center bg-gradient-to-r from-green-400 to-green-600 rounded-3xl shadow-lg p-6 mt-6">
                            <h3 className="text-2xl text-white font-semibold">Total Income: Rs.{totalIncome}</h3>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
                            <button
                                className="rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 font-bold shadow-lg transform transition hover:scale-105 flex-1 md:flex-none"
                                onClick={handleAddProduct}
                            >
                                Add Product
                            </button>

                            <button
                                className="rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 font-bold shadow-lg transform transition hover:scale-105 flex-1 md:flex-none"
                                onClick={handleAddEmployee}
                            >
                                Add Employee
                            </button>

                            {/* Show User List Button */}
                            <button
                                type="button"
                                className="rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 font-bold shadow-lg transform transition hover:scale-105 w-full md:w-auto"
                                onClick={() => setIsUserListModalVisible(true)} // Show the user list modal
                            >
                                Show User List
                            </button>
                        </div>


                        {/* Add Product Form */}
                        {isFormVisible && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white p-8 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-lg font-medium text-gray-700">Product Name</label>
                                                <input
                                                    type="text"
                                                    className="mt-2 block w-full border rounded-md shadow-sm p-3"
                                                    placeholder="Enter Product Name"
                                                    onChange={(e) => { setProductName(e.target.value) }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-lg font-medium text-gray-700">Price</label>
                                                <input
                                                    type="number"
                                                    className="mt-2 block w-full border rounded-md shadow-sm p-3"
                                                    placeholder="Enter Price"
                                                    onChange={(e) => { setProductPrice(e.target.value) }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-lg font-medium text-gray-700">Quantity</label>
                                                <input
                                                    type="number"
                                                    className="mt-2 block w-full border rounded-md shadow-sm p-3"
                                                    placeholder="Enter Quantity"
                                                    onChange={(e) => { setNewProductQty(e.target.value) }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-lg font-medium text-gray-700">Category</label>
                                                <select className="mt-2 block w-full border rounded-md shadow-sm p-3" onChange={
                                                    (e) => { setCategoryId(e.target.value) }
                                                }>
                                                    <option value={0}>Select Category</option>
                                                    {catList?.map((category: any) => (
                                                        <option value={category.id} key={category.id}>
                                                            {category.category}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* <input
                                                    type="number"
                                                    className="mt-2 block w-full border rounded-md shadow-sm p-3"
                                                    placeholder="Enter Quantity"
                                                /> */}
                                            </div>
                                        </div>

                                        {/* Product Image section visually separated */}
                                        <div className="mt-8 p-4 border-2 border-dashed border-gray-400 rounded-lg bg-white">
                                            <h3 className="text-lg font-medium text-gray-700 mb-4">Product Image</h3>
                                            <input type="file" className="block w-full text-gray-700 bg-gray-50 border rounded-md shadow-sm p-3" accept=".png" onChange={(e) => {

                                                if (e.target.files) {
                                                    setProductImage(e.target.files[0]);
                                                }

                                            }} />
                                        </div>

                                        <div className="flex justify-end space-x-4 mt-6">
                                            {/* Add Product Button */}
                                            <button
                                                type="button"
                                                className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transform transition"
                                                onClick={async () => {


                                                    if (productName == "" || productPrice == null || newProductQty == null || catgoryId == 0) {
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "Oops...",
                                                            text: "Please Insert All Product details",
                                                        });
                                                    } else if (productImage == null) {
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "Oops...",
                                                            text: "Please Upload Product Image",
                                                        });


                                                    } else {

                                                        const formData = new FormData();
                                                        formData.append("name", productName);
                                                        formData.append("price", productPrice);
                                                        formData.append("qty", newProductQty)
                                                        formData.append("img", productImage);
                                                        formData.append("catId", catgoryId);

                                                        let response = await axios.post("http://localhost:8080/AddNewProduct", formData, {
                                                            headers: {
                                                                Authorization: `Bearer ${jwtToken}`,
                                                            },
                                                        });

                                                        if (response.status == 200) {

                                                            setIsFormVisible(false);
                                                            Swal.fire({
                                                                icon: "success",
                                                                title: "Succesfull",
                                                                text: response.data,
                                                            });

                                                            setIsUpdated(false);

                                                            // setTimeout(() => {
                                                            //     setIsFormVisible(false);
                                                            // }, 3000);
                                                        } else {
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: "Oops...",
                                                                text: response.data,
                                                            });
                                                        }

                                                    }
                                                }}
                                            >
                                                Add Product
                                            </button>
                                            {/* Close Button */}
                                            <button
                                                type="button"
                                                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transform transition"
                                                onClick={() => setIsFormVisible(false)} // Close the modal
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}



                        {/* Employee Modal */}
                        {isEmployeeModalVisible && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                                    <h2 className="text-xl font-bold mb-4 text-green-600">Add New Employee</h2>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">First Name</label>
                                            <input type="text" className="mt-2 block w-full border rounded-md shadow-sm p-3" placeholder="Enter First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Last Name</label>
                                            <input type="text" className="mt-2 block w-full border rounded-md shadow-sm p-3" placeholder="Enter Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Email</label>
                                            <input type="email" className="mt-2 block w-full border rounded-md shadow-sm p-3" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Password</label>
                                            <input type="password" className="mt-2 block w-full border rounded-md shadow-sm p-3" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Position</label>
                                            <select className="mt-2 block w-full border rounded-md shadow-sm p-3" onChange={(e) => { setPositionId(e.target.value) }}>
                                                <option value="0">Select User Position</option>
                                                {userTypeList.map((type: any) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.type}
                                                    </option>
                                                ))
                                                }
                                            </select>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="button" className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transform transition"
                                                onClick={
                                                    async () => {
                                                        if (userFirstName == '' || userLastName == '' || userPassword == '' || userEmail == '' || positionId == 0) {
                                                            // alert("Please Fill All Details Before Sign In");
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: "Oops...",
                                                                text: "Please Fill All Details Before Sign In !",
                                                            });
                                                        } else if (!emailRegex.test(userEmail)) {
                                                            Swal.fire({
                                                                icon: "warning",
                                                                title: "Oops...",
                                                                text: "Invalid Email Format !",
                                                            });

                                                        } else if (!passwordRegex.test(userPassword)) {
                                                            Swal.fire({
                                                                icon: "warning",
                                                                title: "Oops...",
                                                                text: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character !",
                                                            });

                                                        } else {
                                                            const data = {
                                                                email: userEmail,
                                                                firstName: userFirstName,
                                                                lastName: userLastName,
                                                                password: userPassword,
                                                                position: positionId,
                                                            }

                                                            try {


                                                                let response = await axios.post("http://localhost:8080/userByAdmin", data, {
                                                                    headers: {
                                                                        Authorization: `Bearer ${jwtToken}`,
                                                                    },
                                                                });

                                                                if (response.data === "User Alreday Exist") {
                                                                    Swal.fire({
                                                                        icon: "error",
                                                                        title: "Oops...",
                                                                        text: response.data,
                                                                    });

                                                                } else if (response.data === "User added Succesfully") {

                                                                    setIsEmployeeModalVisible(false);
                                                                    setIsUpdated(false);

                                                                    Swal.fire({
                                                                        icon: "success",
                                                                        title: "Successfull",
                                                                        text: response.data,
                                                                    });
                                                                } else {
                                                                    Swal.fire({
                                                                        icon: "error",
                                                                        title: "Oops...",
                                                                        text: "Something went Wrong! Try Again Later",
                                                                    });
                                                                }

                                                            } catch (error: any) {
                                                                Swal.fire({
                                                                    icon: "error",
                                                                    title: "Oops...",
                                                                    text: "Something went Wrong! Try Again Later",
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            >
                                                Add Employee
                                            </button>
                                            <button type="button" className="ml-4 text-red-500 font-bold" onClick={() => setIsEmployeeModalVisible(false)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Product Modal */}
                        {isProductModalVisible && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3">
                                    <h2 className="text-xl font-bold mb-4 text-green-600">Product Details</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Product ID</label>
                                            <input type="text" readOnly className="mt-2 block w-full border rounded-md shadow-sm p-3 bg-gray-200" value={selectedProduct.id} />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Product Name</label>
                                            <input type="text" readOnly className="mt-2 block w-full border rounded-md shadow-sm p-3 bg-gray-200" value={selectedProduct.name} />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-medium text-gray-700">Current Stock</label>
                                            <input type="number" className="mt-2 block w-full border rounded-md shadow-sm p-3" value={productQty} onChange={(e) => { setProductQty(e.target.value) }} />
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="button" className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600"
                                                onClick={async () => {
                                                    const data = {
                                                        id: selectedProduct.id,
                                                        qty: productQty,
                                                    }

                                                    let response = await axios.post("http://localhost:8080/UpdateSingleProduct", data, {
                                                        headers: {
                                                            Authorization: `Bearer ${jwtToken}`,
                                                        },
                                                    })

                                                    // console.log(response);

                                                    if (response.data) {
                                                        setIsUpdated(false);
                                                        setIsProductModalVisible(false);
                                                    }
                                                }}
                                            >
                                                Update Stock
                                            </button>
                                            <button type="button" className="ml-4 text-red-500 font-bold" onClick={() => setIsProductModalVisible(false)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <UserListModal
                            isVisible={isUserListModalVisible}
                            users={userList}
                            onClose={() => setIsUserListModalVisible(false)}
                            onRemove={handleRemoveUser}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
