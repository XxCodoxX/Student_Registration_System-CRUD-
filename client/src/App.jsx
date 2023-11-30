import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { store } from "./Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import Loader from "./Components/PageLoader";
import ErrorBoundary from "./Components/ErrorBoundary";
const Login = lazy(() => import("./Pages/Login.Page"));
const Home = lazy(() => import("./Pages/Home.Page"));

function App() {
  const reduxPersistStore = persistStore(store);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Provider store={store}>
              <PersistGate persistor={reduxPersistStore}>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/home" element={<Home />} />
                </Routes>
              </PersistGate>
            </Provider>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
