import React, { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthContext';

const useAuth = () => {
       const authInfo = useContext(AuthContext);
       return authInfo;
};

export default useAuth;