import React from 'react'
import type { ReactNode } from 'react'
import { isTokenExpired } from '../utils/jwt';

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified: boolean;
    auth_provider: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [accessToken, setAccessToken] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user');

            if (token && !isTokenExpired(token)) {
                setAccessToken(token);
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        setUser(null);
                    }
                }
                setIsAuthenticated(true);
            } else {
                // Token is expired or not present
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                setAccessToken(null);
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuth();

        // Listen to custom event from Axios interceptors for same-tab updates
        window.addEventListener('auth_change', checkAuth);

        // Optional: listen to storage events across tabs to sync logout
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'accessToken' || e.key === 'user') {
                checkAuth();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('auth_change', checkAuth);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setAccessToken(token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>; // or a proper loading spinner
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
