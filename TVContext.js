import React, { createContext, useState } from 'react';

export const TVContext = createContext();

export const TVProvider = ({ children }) => {
  const [tvs, setTVs] = useState([]);

  return (
    <TVContext.Provider value={{ tvs, setTVs }}>
      {children}
    </TVContext.Provider>
  );
};
