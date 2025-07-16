import React, { createContext, useState, useContext, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { User } from '../types';
import { fetchUser } from '../services/dashboardService';

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = useCallback(async () => {
        setIsLoading(true);
        try {
            const userData = await fetchUser();
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user data", error);
            setUser(null); // Or handle error state appropriately
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const value = useMemo(() => ({
        user,
        isLoading,
        refetchUser: loadUser
    }), [user, isLoading, loadUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};