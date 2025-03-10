import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login, register, logout, getCurrentUser } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logoutUser: () => Promise<void>;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      getCurrentUser()
        .then(user => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token: state.token! }
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        });
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const data = await login({ email, password });
      localStorage.setItem('token', data.access_token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: data.user, token: data.access_token }
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Invalid email or password'
      });
    }
  };

  const registerUser = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const data = await register({ name, email, password, password_confirmation });
      localStorage.setItem('token', data.access_token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: data.user, token: data.access_token }
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Registration failed'
      });
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        loginUser,
        registerUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}