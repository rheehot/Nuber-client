import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import GlobalStyles from '../../GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';
import useUserLoader from './hooks/useUserLoader';

interface CoreProps {}
const Core: React.FC<CoreProps> = () => {
  useUserLoader();

  const history = useHistory();

  React.useEffect(() => {
    const unregister = history.listen(location => {
      console.log(location);
    });

    return () => {
      unregister();
    };
  }, [history]);
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
