import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer, { resetUser } from './slides/userSlide'
import orderReducer from './slides/orderSlide'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const getUserId = () => {
  return  localStorage.getItem('id') || 'default';
};



const persistConfig = {
  key: getUserId(),
  version: 1,
  storage,
  blacklist: ['product','user']
}

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Action để xóa trạng thái persist của giỏ hàng khi đăng xuất
export const logoutUser = () => {
  return (dispatch) => {
    // Xóa trạng thái persist của giỏ hàng
    dispatch({
      type: PURGE,
      key: 'root', // Key của persistConfig
      result: () => null // Callback sau khi xóa
    });
    // Reset state của user
    dispatch(resetUser());

    updateUserPersistKey('default');
  };
};

// Hàm để cập nhật key trong persistConfig khi người dùng đăng nhập
export const updateUserPersistKey = (userId) => {
  persistConfig.key = `persist:${userId}`; // Cập nhật key mới với prefix 'persist:'

  persistor = persistStore(store)
};


export let persistor = persistStore(store)