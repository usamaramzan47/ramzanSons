import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const [currentPage, setCurrentPage] = useState('Home');

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <AppContext.Provider value={{ isSidebarCollapsed, toggleSidebar, theme, toggleTheme, currentPage, setCurrentPage }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
