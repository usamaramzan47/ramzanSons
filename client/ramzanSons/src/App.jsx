import Navbar from './components/global/navbar/Navbar.jsx';
import Sidebar from './components/global/sidebar/Sidebar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Login from './pages/login/Login.jsx';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import User from './pages/users/User.jsx';
import Products from './pages/products/Products.jsx';
import Shops from './pages/shops/Shops.jsx';
import Editshop from './pages/shops/EditShop.jsx';
import Orders from './pages/orders/Orders.jsx';
import OrderTaking from './pages/orders/OrderTaking.jsx';
import OrderForm from './pages/orders/OrderForm.jsx';
import EditProducts from './pages/products/EditProducts.jsx';
import NewProduct from './pages/products/NewProduct.jsx';
import NewShop from './pages/shops/NewShop.jsx';
import ShopDetails from './pages/shops/ShopDetails.jsx';
import Pricing from './pages/pricing/Pricing.jsx';
import DetailPricing from './pages/pricing/DetailPricing.jsx';

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className={`w-full h-full App  ${theme}`}>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const currentUser = true;
  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) return <Navigate to="/login" replace />;
  //   return children;
  // };
  const isLoginPage = location.pathname === '/adminLogin' || location.pathname === '/login';

  return (
    <>
      {!isLoginPage && (

        // <ProtectedRoute>
        <div className='flex w-full h-full transition-all'>
          <Sidebar />
          <div className='flex w-full h-full flex-col'>
            <Navbar />
            {currentUser &&
              <div className='max-w-full h-screen dark:bg-slate-800'>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/users" element={<User />} />
                  <Route exact path="/products" element={<Products />} />
                  <Route exact path="/editProduct" element={<EditProducts />} />
                  <Route exact path="/newProduct" element={<NewProduct />} />
                  <Route exact path="/pricing" element={<Pricing />} />
                  <Route exact path="/priceDetail" element={<DetailPricing />} />
                  <Route exact path="/shops" element={<Shops />} />
                  <Route exact path="/editShop" element={<Editshop />} />
                  <Route exact path="/newShop" element={<NewShop />} />
                  <Route exact path="/shopDetails" element={<ShopDetails />} />
                  <Route exact path="/orders" element={<Orders />} />
                  <Route exact path="/orderTaking" element={<OrderTaking />} />
                  <Route exact path="/orderForm" element={<OrderForm />} />
                </Routes>
              </div>}
          </div>
        </div>
        // </ProtectedRoute>
      )}

      {isLoginPage && (

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

// function NotAuthorized() {
//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <h1 className="text-3xl font-bold">You are not authorized to view this page. Please log in.</h1>
//     </div>
//   );
// }
export default App;
