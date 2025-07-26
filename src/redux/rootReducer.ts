import { combineReducers } from 'redux';
import oauthReducer from '@/modules/auth/oauthSlice';

const RootReducer = combineReducers({
	oauth: oauthReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
