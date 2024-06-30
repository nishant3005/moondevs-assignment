import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearAuth } from '@/redux/auth/auth.slice';
import { RootState } from '@/redux/store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const checkSession = async () => {
      if (token) {
        try {
          // Decode the token to get user information
          const decodedToken: any = jwtDecode(token);

          // Check if the token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(clearAuth());
          } else {
            // Fetch user data if not already available
            if (!user) {
              const response = await axios.get('/api/user', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              dispatch(setUser(response.data.user));
            }
          }
        } catch (error) {
          dispatch(clearAuth());
          console.error('Failed to verify token:', error);
        }
      }
    };

    checkSession();
  }, [token, user, dispatch]);

  return user;
};

export default useAuthSession;
