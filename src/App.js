import axios from "axios";
import { lazy, Suspense, useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { apiGetUserInfo, setAccessTokenHeader } from "./services/api";
import {
  storageGetAccessToken,
  storageClearAccessToken,
  storageSetAccessToken,
} from "./services/storage";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Loading from "./components/Loading";

import Home from "./pages/Home";
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const initialState = {
  isLoggedIn: Boolean(storageGetAccessToken()),
  accessToken: storageGetAccessToken(),
  userInfo: null,
};

function App() {
  const appReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, accessToken: action.value, isLoggedIn: true };
      case "logout":
        return { ...state, accessToken: "", isLoggedIn: false, userInfo: null };
      case "setUserInfo":
        return { ...state, userInfo: action.value };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getUserInfo() {
      try {
        const { data } = await apiGetUserInfo({
          cancelToken: request.token,
        });
        dispatch({ type: "setUserInfo", value: data.data.user });
      } catch (e) {
        console.log(e);
      }
    }

    if (state.isLoggedIn && state.accessToken) {
      // get user info
      storageSetAccessToken(state.accessToken);
      setAccessTokenHeader(state.accessToken);
      getUserInfo();
    } else {
      setAccessTokenHeader("");
      storageClearAccessToken();
      dispatch({ type: "logout" });
    }

    return () => request.cancel();
  }, [state.isLoggedIn, state.accessToken]);

  return (
    <div>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
