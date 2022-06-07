import clsx from 'clsx';
import React from 'react';
import { ToastProvider, useToasts } from 'react-toast-notifications';

import { getUsersDatabase, UsersModel } from '@/lib/database';

export type Action =
  | {
      type: 'SET_INITIAL_STATE';
      state: any;
    }
  | {
      type: 'SET_AUTHORIZED';
      userData: UsersModel;
    }
  | {
      type: 'SET_UNAUTHORIZED';
    };

export interface State {
  dataLoaded: boolean;
  userData: string | null;
  isAuthorized: boolean;
}

const getAuthUserId = (): string | null => {
  const authToken = localStorage.getItem('auth_token');
  if (authToken) return JSON.parse(atob(authToken) ?? '{}').id;
  return null;
};
const clearAuthToken = () => localStorage.removeItem('auth_token');

const fetchUserData = async () => {
  const userId = getAuthUserId();

  if (userId) {
    try {
      const users = getUsersDatabase();

      const userData = await users.get(userId);

      if (userData && userData.isBlocked === false) {
        initialState.userData = JSON.stringify(userData);
        initialState.isAuthorized = true;
      } else new Error('Unauthorized access');
    } catch (error) {
      clearAuthToken();
      initialState.isAuthorized = false;
    }
  }

  initialState.dataLoaded = true;
  return initialState;
};

const initialState: State = {
  dataLoaded: false,
  userData: null,
  isAuthorized: false,
};

export const UIContext = React.createContext<any>({});

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE': {
      return {
        ...action.state,
      };
    }
    case 'SET_AUTHORIZED': {
      return {
        ...state,
        userData: JSON.stringify(action.userData ?? {}),
        isAuthorized: true,
      };
    }
    case 'SET_UNAUTHORIZED': {
      clearAuthToken();
      return {
        ...state,
        userData: null,
        isAuthorized: false,
      };
    }
  }
}

export const UIProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { addToast } = useToasts();

  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  React.useEffect(() => {
    fetchUserData().then(() => {
      dispatch({ type: 'SET_INITIAL_STATE', state: initialState });
    });
  }, []);

  const authorize = (userData: UsersModel) =>
    dispatch({ type: 'SET_AUTHORIZED', userData });
  const unauthorize = () => dispatch({ type: 'SET_UNAUTHORIZED' });

  const login = (userData: UsersModel) => {
    authorize(userData);
    localStorage.setItem('auth_token', btoa(JSON.stringify(userData)));
  };

  const showToast = (data: {
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message: string;
  }) =>
    addToast(
      <>
        {data.title && (
          <p className='pb-1 text-lg font-semibold leading-tight text-gray-800'>
            {data.title}
          </p>
        )}
        <p className='pb-2 text-sm font-normal text-gray-600'>{data.message}</p>
      </>,
      { appearance: data.type }
    );

  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      showToast,
      getUserData: () => JSON.parse(state.userData || 'null'),
      login,
    }),
    [state] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context: {
    dataLoaded: boolean;
    userData: string | null;
    isAuthorized: boolean;
    authorize: (userData: UsersModel) => void;
    unauthorize: () => void;
    showToast: (data: {
      type: 'success' | 'error' | 'info' | 'warning';
      title?: string;
      message: string;
    }) => void;
    getUserData: () => UsersModel | null;
    login: (userData: UsersModel) => void;
  } = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

function CustomToast({
  appearance,
  children,
  transitionState,
  autoDismissTimeout,
}: {
  appearance: string;
  children: React.ReactNode;
  transitionState: string;
  autoDismissTimeout: number;
}) {
  return (
    <div
      role='alert'
      className={clsx(
        'translate-show mr-4 mb-4 flex w-full max-w-sm flex-row overflow-hidden rounded-lg bg-white pr-4 shadow-lg transition-all duration-300 ease-in-out',
        transitionState == 'entering' && 'translate-hide',
        transitionState == 'exiting' && 'translate-hide'
      )}
    >
      {appearance == 'success' && (
        <div className='flex items-center border-gray-300 px-4 text-green-400 sm:justify-center sm:border-r sm:px-6'>
          <svg viewBox='0 0 24 24' width='40' height='40' fill='currentColor'>
            <path
              className='heroicon-ui'
              d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z'
            />
          </svg>
        </div>
      )}
      {appearance == 'error' && (
        <div className='flex items-center border-gray-300 px-4 text-red-400 sm:justify-center sm:border-r sm:px-6'>
          <svg viewBox='0 0 12 16' width='40' height='40' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M5.05.01c.81 2.17.41 3.38-.52 4.31C3.55 5.37 1.98 6.15.9 7.68c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.01 8.68 2.15 5.05.02L5.03 0l.02.01z'
            />
          </svg>
        </div>
      )}
      {appearance == 'warning' && (
        <div className='flex items-center border-gray-300 px-4 text-yellow-400 sm:justify-center sm:border-r sm:px-6'>
          <svg viewBox='0 0 16 16' width='40' height='40' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z'
            />
          </svg>
        </div>
      )}
      {appearance == 'info' && (
        <div className='flex items-center border-gray-300 px-4 text-blue-400 sm:justify-center sm:border-r sm:px-6'>
          <svg viewBox='0 0 14 16' width='40' height='40' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M6.3 5.71a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 8.01c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V8v.01zM7 2.32C3.86 2.32 1.3 4.86 1.3 8c0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 1c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z'
            />
          </svg>
        </div>
      )}
      <div className='flex flex-col justify-center py-3 pl-4 sm:w-9/12'>
        {children}
      </div>
      <div className='round-time-bar absolute bottom-0 left-0 w-full'>
        <div className='round-time-bar-bg absolute bottom-0 left-0 w-full bg-gray-200' />
        <div
          className={clsx(
            'round-time-bar-overlay',
            appearance == 'success' && 'bg-green-400',
            appearance == 'error' && 'bg-red-400',
            appearance == 'warning' && 'bg-yellow-400',
            appearance == 'info' && 'bg-blue-400'
          )}
        />
      </div>
      <style jsx>
        {`
          .round-time-bar .round-time-bar-overlay {
            height: 5px;
            animation: roundtime calc(${autoDismissTimeout}ms) linear forwards;
            transform-origin: left center;
          }
          .round-time-bar .round-time-bar-bg {
            height: 5px;
            transform-origin: left center;
          }
          @keyframes roundtime {
            to {
              transform: scaleX(0);
            }
          }
          .translate-show {
            transform: translateX(0%);
          }
          .translate-hide {
            transform: translateX(150%);
          }
        `}
      </style>
    </div>
  );
}

export const ManagedUIContext: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <ToastProvider
    components={{ Toast: CustomToast }}
    autoDismiss={true}
    autoDismissTimeout={5000}
    placement='bottom-right'
  >
    <UIProvider>{children}</UIProvider>
  </ToastProvider>
);
