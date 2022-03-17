import { useContext } from "react";
import { Navigate } from "react-router-dom";

import StateContext from "../StateContext";

const PrivateRoute = (props) => {
  const appState = useContext(StateContext);

  return appState.isLoggedIn ? (
    props.outlet
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default PrivateRoute;
