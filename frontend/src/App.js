import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./components/Auth/Auth";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" exact>
          {/* <Users /> */}
        </Route>
        <Route path="/:userId/places" exact>
          {/* <UserPlaces /> */}
        </Route>
        <Route path="/places/new" exact>
          {/* <NewPlace /> */}
        </Route>
        <Route path="/places/:placeId">{/* <UpdatePlace /> */}</Route>
        <Redirect to="/" />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact>
          {/* <Users /> */}
        </Route>
        <Route path="/:userId/places" exact>
          {/* <UserPlaces /> */}
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        {/* <MainNavigation /> */}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
