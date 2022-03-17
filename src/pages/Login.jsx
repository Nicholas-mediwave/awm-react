import axios from "axios";
import { useEffect, useReducer } from "react";

import Page from "../components/Page";
import { apiLogin } from "../services/api";

const initialState = {
  email: "",
  password: "",
  submit: false,
};

const LoginPage = () => {
  const loginReducer = (state, action) => {
    switch (action.type) {
      case "setEmail":
        return { ...state, email: action.value };
      case "setPassword":
        return { ...state, password: action.value };
      case "setSubmit":
        return { ...state, submit: action.value };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function login() {
      try {
        await apiLogin({
          payload: {
            email: state.email,
            password: state.password,
          },
          cancelToken: request.token,
        });
      } catch (e) {
        console.log(e);
      } finally {
        dispatch({ type: "setSubmit", value: false });
      }
    }

    if (state.submit) {
      login();
    }
  }, [state.submit, state.email, state.password]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "setSubmit", value: true });
  }

  return (
    <Page>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "setEmail", value: e.target.value })
          }
        />
        <input
          type="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "setPassword", value: e.target.value })
          }
        />
        <input type="submit" />
      </form>
    </Page>
  );
};

export default LoginPage;
