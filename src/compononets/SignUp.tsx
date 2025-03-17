import { Link } from 'react-router-dom';
import backgroundImage from '../assets/pexels-imin-technology-276315592-12935074.jpg';
import SignUpForm from './sub/SignUpForm';

function SignUp() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="max-w-lg w-full space-y-8 p-8 md:p-12 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg">
                <h1 className="text-center text-4xl font-extrabold text-green-800 tracking-tight">
                    Welcome to QuickPOS
                </h1>
                <p className="text-center text-lg text-gray-700 font-medium">
                    Sign up to create your account
                </p>

                <SignUpForm />

                <div className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-green-600 font-medium hover:underline">
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
