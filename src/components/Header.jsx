import { Link } from "react-router-dom";

import { useContext } from "react";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Header = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!appState.isLoggedIn && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>

      {appState.isLoggedIn && appState.userInfo && (
        <>
          <span>Hi {appState.userInfo.name}</span>
          <button onClick={() => appDispatch({ type: "logout" })}>
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default Header;
