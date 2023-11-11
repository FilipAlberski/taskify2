// useAuthInitializer.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckAuthQuery } from '../slices/usersApiSlice'; // import your query hook
import { setCredentials } from '../slices/authSlice'; // import your action creator

const useAuthInit = () => {
  const dispatch = useDispatch();
  const { data } = useCheckAuthQuery();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ ...data }));
    }
  }, [data, dispatch]);
};

export default useAuthInit;
