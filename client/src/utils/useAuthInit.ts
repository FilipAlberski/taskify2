// useAuthInit.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckAuthQuery } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const useAuthInit = async () => {
  const dispatch = useDispatch();
  const { data } = useCheckAuthQuery();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [dispatch, data]);
};

export default useAuthInit;
