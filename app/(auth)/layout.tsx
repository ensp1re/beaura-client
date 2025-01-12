import { FC, ReactElement } from "react";
import { Urbanist } from "next/font/google"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const urbanist = Urbanist({
    display: 'swap',
    weight: ["300", "400", "700"],
    subsets: ["latin"],
});

const AuthLayout: FC<AuthLayoutProps> = ({ children }): ReactElement => {
    return (
        <div className={`min-w-screen w-full h-screen flex flex-row items-center justify-center ${urbanist.className}`}>
            <ToastContainer />
            {children}
        </div>

    );
};

export default AuthLayout;
