import React, { useState } from 'react';
import InputField from './InputField'; // Reuse your InputField component
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';


export default function SignUpForm() {
    const [userFirstName, setFirstName] = useState('');
    const [userLastName, setLastName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false); // State to control the OTP modal

    const [finalEmail, setFinalEmail] = useState<any>();
    const [finalPassword, setFinalPassword] = useState<any>();


    const [otp, setOtp] = useState<any>("");

    const navigate = useNavigate();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleFirstNameChange = (event: any) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event: any) => { setLastName(event.target.value); };
    const handleEmailChange = (event: any) => { setEmail(event.target.value); };
    const handlePasswordChange = (event: any) => { setPassword(event.target.value); };

    return (
        <>
            <form className="space-y-8">
                <div className="space-y-6">
                    <InputField
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        onChange={handleFirstNameChange}
                    />
                    <InputField
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        onChange={handleLastNameChange}
                    />
                    <InputField
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        onChange={handleEmailChange}
                    />
                    <InputField
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                </div>

                <div>
                    {/* Sign Up Button */}
                    <button
                        type="button"
                        disabled={showOtpModal}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={
                            async () => {
                                if (userFirstName == '' || userLastName == '' || userPassword == '' || userEmail == '') {
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
                                        password: userPassword
                                    }

                                    try {

                                        // console.log(data);

                                        setFinalEmail(userEmail);
                                        setFinalPassword(userPassword);
                                        let response = await axios.post("http://localhost:8080/auth/userSignUp", data);

                                        if (response.data === "User Alreday Exist") {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "User is Already Exist!",
                                            });

                                        } else if (response.data === "User added Succesfully") {

                                            // navigate("/auth/login");
                                            setShowOtpModal(true);
                                        }

                                    } catch (error: any) {

                                        // if (error.response && error.response.status === 409) {

                                        //     Swal.fire({
                                        //         icon: "error",
                                        //         title: "Oops...",
                                        //         text: "User is Already Exist!",
                                        //     });

                                        // } else {

                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "Something went Wrong! Try Again Later",
                                        });

                                        // }

                                    }



                                }
                            }
                        }
                    >
                        Sign Up
                    </button>
                </div>

                {/* Divider */}
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                </div>
            </form >
            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed top-0 left-0 right-0 flex items-start justify-center p-4 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg z-60">
                        <h2 className="text-lg font-bold mb-4 text-center text-lime-700">Enter OTP</h2>
                        <InputField
                            type="text"
                            id="otp"
                            placeholder="OTP"
                            onChange={(e: any) => { setOtp(e.target.value) }} // Add your handler here

                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                className="mr-2 px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition duration-300"
                                onClick={async () => {

                                    const otpdata = {
                                        email: finalEmail,
                                        password: finalPassword,
                                        otp: otp,

                                    }

                                    let response = await axios.post("http://localhost:8080/auth/OtpVerification", otpdata);

                                    if (response.data == "Success") {

                                        navigate("/auth/login");

                                    } else if (response.data == "Invalid Otp") {

                                        Swal.fire({
                                            icon: "error",
                                            title: "Invalid",
                                            text: "Invliad Otp !",
                                        });

                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "Something went Wrong! Try Again Later",
                                        });
                                    }

                                }}

                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}




        </>
    );
}
