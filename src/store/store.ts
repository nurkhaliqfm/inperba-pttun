import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "@/modules/public/store/session.slice";
import oauthReducer from "@/modules/auth/store/oauth.slice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const { VITE_NODE_ENV } = import.meta.env;

const rootReducer = combineReducers({
	sessions: sessionReducer,
	oauths: oauthReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["sessions", "oauths"],
	devTools: VITE_NODE_ENV !== "production",
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
