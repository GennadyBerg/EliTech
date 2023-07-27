import React from 'react';

const useLocalStorageInit = (key, defaultValue) => {
    const [value, setValue] = React.useState(() => {
        const storedValue = JSON.parse(localStorage.getItem(key));
        return storedValue !== null ? storedValue : defaultValue;
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorageInit;
