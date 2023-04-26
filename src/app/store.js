import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mailSlice.js';
import userReducer from '../features/userSlice.js';
import sidebarReducer from '../features/sidebarSlice.js';
import appReducer from '../features/appMode.js';

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
    sidebar: sidebarReducer,
    app: appReducer,
  },
});
