import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import GlobalStyles from '../../GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';

interface CoreProps {}
const Core: React.FC<CoreProps> = ({}) => {
  return (
    <>
      <GlobalStyles />
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Core;
