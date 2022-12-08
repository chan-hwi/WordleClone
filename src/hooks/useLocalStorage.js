import { useState, useCallback } from 'react';

function useLocalStorage(key, { initialValue, stateToStorage, storageToState }) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) return storageToState ? storageToState(storedValue) : storedValue;
        else if (initialValue) {
            localStorage.setItem(key, stateToStorage ? stateToStorage(initialValue) : initialValue);
            return initialValue;
        }
        return null;
    });

    const setItem = useCallback((newValue) => {
        setValue(value => {
            const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
            localStorage.setItem(key, stateToStorage ? stateToStorage(valueToStore) : valueToStore);
            return valueToStore;
        })
    }, [key, stateToStorage]);

    return [value, setItem];
}

export default useLocalStorage;