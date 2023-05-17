import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLinkClickHandler } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Login } from "./pages/login/login"
import { Admin } from "./pages/admin/admin";
import { Productedit } from "./pages/productedit/productedit";
import { Register } from "./pages/register/register"
import { Profile } from "./pages/profile/profile"
import { ProductDetails } from "./pages/productDetails/productDetails";
import { ShopContextProvider } from "./context/shop-context";
import { PrivateRoute } from "./components/privateroute/privateroute";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/productedit" element={<PrivateRoute><Productedit /></PrivateRoute>}/>
          </Routes>
          <Footer />
          </div>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;

