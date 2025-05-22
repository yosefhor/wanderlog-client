import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const updateUsername = (newUsername) => { setUsername(newUsername) };

  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};