import React, { createContext, useState } from 'react';

export const LightContext = createContext();

export const LightProvider = ({ children }) => {
  const [lights, setLights] = useState([]);

  return (
    <LightContext.Provider value={{ lights, setLights }}>
      {children}
    </LightContext.Provider>
  );
};