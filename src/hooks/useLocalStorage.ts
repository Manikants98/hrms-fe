import React from 'react';

/**
 * Hook to get and set a value in localStorage.
 *
 * @template T
 * @param {string} key - The key to store the value under.
 * @param {T} initialValue - The initial value to return if no value is stored in localStorage.
 * @returns {readonly [T, (value: T) => void]} An array containing the stored value and a function to set the value.
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): readonly [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};
