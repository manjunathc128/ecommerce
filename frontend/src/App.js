import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
// import CategoryPage from "./CategoryPage";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import CategoryNav from "./pages/CategoryNav";
import { AppProvider } from "./context/AppContext/AppContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import "./index.css";
import "tailwindcss/tailwind.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AccountDetails from "./components/AccountDetails";
import BannerCarousel from "./components/BannerCarousel";

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <CategoryNav />

                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route
                index
                element={
                  <>
                    <BannerCarousel></BannerCarousel>
                    <ProductList />
                  </>
                }
              ></Route>
              <Route path="/:category" element={<ProductList />} />
              <Route path="/:category/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<AccountDetails />} />
              <Route path="/account/signin/" element={<Login />} />
              <Route path="/account/signup/" element={<SignUp />} />
              <Route path="/profile" element={<AccountDetails />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
