import React, { useState } from 'react';
import InputField from './InputField';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignInForm() {

    const { login } = useAuth();

    const [userEmail, setEmail] = React.useState('');
    const [userPassword, setPassword] = React.useState('');
    const [showOtpModal, setShowOtpModal] = useState(false); // State to control the OTP modal


    const [finalEmail, setFinalEmail] = useState<any>();
    const [otp, setOtp] = useState<any>("");


    const navigate = useNavigate();


    const handleEmailChange = (event: any) => { setEmail(event.target.value) };
    const handlePasswordChange = (event: any) => { setPassword(event.target.value) };

    return (
        <>
            <form className="space-y-8">
                <div className="space-y-6">
                    <InputField
                        type="email"
                        id="email"
                        placeholder="Email address"
                        onChange={handleEmailChange}
                    />
                    <InputField
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="remember-me"
                            className="block text-sm text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-green-600 hover:text-green-500"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    {/* Sign In Button */}
                    <button disabled={showOtpModal}
                        type="button"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={async () => {
                            if (userEmail == '') {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Please Fill Email !",
                                });

                            } else if (userPassword == '') {

                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Please Fill Password !",
                                });

                            } else {

                                const data = {
                                    email: userEmail,
                                    password: userPassword,
                                }

                                try {

                                    setFinalEmail(userEmail);
                                    const response = await axios.post("http://localhost:8080/auth/login", data);

                                    if (response.data == "Invalid User Status") {

                                        setShowOtpModal(true);


                                    } else if (response.data == "Invalid User Details") {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: response.data,
                                        });
                                    } else {

                                        login(response.data);
                                        navigate("/");

                                    }


                                } catch (error) {

                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Something Went Wrong Please Try Again Later !",
                                    });

                                }



                            }
                        }}
                    >
                        Sign In
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

                {/* Sign Up Button */}
                <div className="text-center mt-6">
                    <a
                        href="/auth/SignUp"
                        className="inline-block w-full py-3 px-4 text-green-700 bg-white border border-green-600 hover:bg-green-50 rounded-md shadow-sm text-sm font-medium"
                    >
                        Create an Account
                    </a>
                </div>
            </form>


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
                                        otp: otp,

                                    }

                                    let response = await axios.post("http://localhost:8080/auth/OtpVerification", otpdata);

                                    if (response.data == "Success") {

                                        setShowOtpModal(false);
                                        Swal.fire({
                                            icon: "success",
                                            title: "Success",
                                            text: "Now You Can SignIn !",
                                        });

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
            )
            }
        </>
    );
}
