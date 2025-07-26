import { configureStore } from '@reduxjs/toolkit';
import { setOAuthData } from '../modules/auth/oauthSlice';
import rootReducer from './rootReducer';

const store = configureStore({
	reducer: rootReducer,
});

const oauthData = localStorage.getItem('oauthData');
if (oauthData) {
	const parseOAuthData = JSON.parse(oauthData);
	store.dispatch(setOAuthData(parseOAuthData));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
