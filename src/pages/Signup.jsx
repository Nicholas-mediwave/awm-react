import axios from "axios";

import { useState, useEffect } from "react";
import Page from "../components/Page";

import { apiSignup } from "../services/api";

const SignupPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    submit: false,
  });

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function signup() {
      try {
        await apiSignup({
          payload: {
            email: state.email,
            password: state.password,
            name: state.name,
          },
          cancelToken: request.token,
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (state.submit) {
      signup();
    }

    return () => {};
  }, [state.submit, state.email, state.name, state.password]);

  function handleSubmit(e) {
    e.preventDefault();
    setState((prev) => ({ ...prev, submit: true }));
  }
  return (
    <Page>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            setState((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            setState((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input type="submit" value="create account" />
      </form>
    </Page>
  );
};

export default SignupPage;
