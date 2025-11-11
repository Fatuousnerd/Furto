import Main from "./components/Main";
import ThemeProvider from "./utils/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sign from './auth/Sign';
import Login from './auth/Login';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      {/* <ThemeProvider> */}
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/auth/sign-up" element={<Sign />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App
