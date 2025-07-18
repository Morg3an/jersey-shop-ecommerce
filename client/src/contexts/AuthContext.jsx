import { createContext, useState, useEffect } from 'react';
import { getUserFromToken } from '../utils/tokenUtils';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (stored) {
            const decodedUser = getUserFromToken(stored);
            setUser(decodedUser);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const userData = getUserFromToken(token);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;