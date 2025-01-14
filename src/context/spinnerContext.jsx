import React, { createContext, useContext, useState } from 'react';

export const SpinnerContext = createContext();

export const useSpinner = () => {
    return useContext(SpinnerContext);
};

export default function SpinnerProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const showSpinner = () => setIsLoading(true);
    const hideSpinner = () => setIsLoading(false);

    return (
        <SpinnerContext.Provider value={{ isLoading, showSpinner, hideSpinner }}>
            {children}
        </SpinnerContext.Provider>
    );
};