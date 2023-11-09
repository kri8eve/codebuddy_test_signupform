/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';

const SignUpContext = createContext();

const SignUpProvider = ({children}) => {
  const [user, setUser] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  });

  return (
    <SignUpContext.Provider value={{user, setUser}}>
      {children}
    </SignUpContext.Provider>
  );
};

export {SignUpProvider, SignUpContext};
