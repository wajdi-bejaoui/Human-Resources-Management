// import { configureStore } from '@reduxjs/toolkit';
// import employeeReducer from './employees/employeeSlice';


// const store = configureStore({
//   reducer: {
//     employees: employeeReducer,
//   },
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from './employees/employeeSlice';

// Define persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Apply the persist reducer to the employees reducer
const persistedReducer = persistReducer(persistConfig, employeeReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: {
    employees: persistedReducer,
    // other reducers if you have any
  },
});

export const persistor = persistStore(store);
