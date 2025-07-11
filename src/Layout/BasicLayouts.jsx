import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';

const BasicLayouts = () => {
       return (
              <div>
                     <Navbar></Navbar>
                     <Outlet></Outlet>
                     <Footer></Footer>
                     
                     
              </div>
       );
};

export default BasicLayouts;