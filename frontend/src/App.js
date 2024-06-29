import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import BookForm from "./components/BookForm/BookForm";
import RecyclersList from "./components/RecyclersList/RecyclersList";
import Auth from "./components/Auth/Auth";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";
import Footer from "./components/Footer/Footer";
import Advertise from "./components/Advertise/Advertise";
import RecyclerDetails from "./components/RecyclerDetails/RecyclerDetails";

const App = () => {
  const { token, login, logout, userId, role } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<BookForm />} />
        <Route path="/add" element={<Advertise />} />
        <Route path="/listing" element={<RecyclersList />} />
        <Route path="/recycler/:id" component={RecyclerDetails} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Auth />} />
        <Route path="/listing" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
