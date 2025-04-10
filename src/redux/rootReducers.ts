import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { mmkvStorage } from '../utils/storage/mmkv';
import userInfoReducer from '../redux/features/userInfo/userInfoSlice'
import { userApi } from './services/apis/userApi';

const persistConfig = {
    key: 'root',
    storage: mmkvStorage,
    // whitelist: ['userInfo', userApi.reducerPath]
};

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    [userApi.reducerPath]: userApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
