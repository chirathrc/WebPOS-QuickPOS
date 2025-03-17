import backgroundImage from '../assets/pexels-imin-technology-276315592-12935074.jpg';
import SignInForm from './sub/SignInForm';

function SignIn() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="max-w-lg w-full space-y-12 p-8 md:p-12 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg">
                <h1 className="text-center text-4xl font-extrabold text-green-800 tracking-tight">
                    Welcome to QuickPOS
                </h1>
                <p className="text-center text-lg text-gray-700 font-medium">
                    Sign in to manage your account
                </p>

                <SignInForm />
            </div>
        </div>
    );
}

export default SignIn;
