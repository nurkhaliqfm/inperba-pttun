import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { persistor, store } from "./store/store.ts";
// import { PersistGate } from "redux-persist/integration/react";
import { HeroUIProvider } from "@heroui/react";
import AppRouter from "./router/AppRouter.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ToastContainer
						newestOnTop
						pauseOnHover={false}
						closeOnClick
						stacked
						draggablePercent={20}
						pauseOnFocusLoss={false}
					/>
					<HeroUIProvider>
						<AppRouter />
					</HeroUIProvider>
				</PersistGate>
			</Provider>
		</StrictMode>
	</BrowserRouter>
);
