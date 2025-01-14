import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ username: '', password: '' });
  const updateUser = (newUser) => { setUser(prevUser => ({ ...prevUser, ...newUser })) };

  return (
    <UserContext.Provider value={{user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};