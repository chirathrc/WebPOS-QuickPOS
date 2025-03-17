interface AuthContextType {
    isAuthenticated: boolean;
    jwtToken: string | null;
    login: (jwtToken: string) => void;
    loading: boolean;
    logout: () => void;

}

export default AuthContextType;