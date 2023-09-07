import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    name: string;
}

interface UserContextData {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (

        <UserContext.Provider value={{ user, setUser }}>
            {children}
            </UserContext.Provider>
    );
}
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined ) { 
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}