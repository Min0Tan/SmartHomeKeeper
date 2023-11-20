import React, { createContext, useState } from 'react';

export const ACContext = createContext();

export const ACProvider = ({ children }) => {
  const [acs, setACs] = useState([]);

  return (
    <ACContext.Provider value={{ acs, setACs }}>
      {children}
    </ACContext.Provider>
  );
};