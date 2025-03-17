import { createContext, useContext, useEffect, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";


export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    jwtToken: null,
    login: () => { },
    loading: true,
    logout: () => { }
});

export function AuthProvider({ children }: AuthProviderPropsType) {

    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function login(jwtToken: string) {
        setAuthenticated(true);
        setJwtToken(jwtToken);
        localStorage.setItem("token", jwtToken);
    }

    function logout() {
        setAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        
        const token = localStorage.getItem("token");

        if (token !== null) {
            setAuthenticated(true);
            setJwtToken(token);
            setLoading(false);
        } else {
            setLoading(false);
        }
    });

    return (
        <AuthContext.Provider value={{ isAuthenticated, jwtToken, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}