import { createContext, useContext, useState, useEffect } from 'react';
import { decodeToken, isTokenExpired } from '../utils/tokenUtils';

const AuthContext = createContext(null);  // manages authentication globally.

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));  // Stores JWT
    const [user, setUser] = useState(null);  // Stores decoded user
    const [loading, setLoading] = useState(true); // Prevents page rendering before authentication check finishes.

    useEffect(() => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        const decoded = decodeToken(token);

        if (!decoded || isTokenExpired(decoded)) {
            logout();
            setLoading(false);
            return;
        }

        setUser(decoded);
        setLoading(false);
    }, [token]);

    function login(newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}