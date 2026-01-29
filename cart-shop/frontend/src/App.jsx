import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router";
import { routePath } from "./routes/routePath";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import ProductUploadForm from "./components/forms/ProductUploadForm";
import ManageProducts from "./pages/ManageProducts";
import ProductPage from "./pages/ProductPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import MyCart from "./pages/MyCart";
import { Toaster } from "react-hot-toast";
import VendorProtectedRouter from "./routes/protectedRouters/VendorProtectedRouter";
import AdminDashboard from "./pages/administration/AdminDashboard";
import AdminProtectedRouter from "./routes/protectedRouters/AdminProtectedRouter";
import { useEffect } from "react";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import ResetPassword from "./pages/authPages/ResetPassword";
import ProfileSettings from "./pages/ProfileSettings";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useDispatch } from "react-redux";
import { fetchApprovedProductAsync } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApprovedProductAsync());
    // function meAPI(){
    //   console.log("login")
    // }
    // meAPI()
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={routePath.HOME} element={<h1>Home</h1>} />
        <Route path={routePath.LOGIN} element={<LoginPage />} />
        <Route path={routePath.PRODUCT} element={<ProductPage />} />
        <Route path={routePath.MYORDERS} element={<MyOrdersPage />} />
        <Route path={routePath.MYCART} element={<MyCart />} />
        <Route path={routePath.REGISTER} element={<RegisterPage />} />
        <Route path={routePath.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route
          path={`${routePath.RESET_PASSWORD}/:token`}
          element={<ResetPassword />}
        />
        <Route
          path={routePath.PROFILE_SETTINGS}
          element={<ProfileSettings />}
        />
        <Route
          path={`${routePath.PRODUCT}/:category/:productCode`}
          element={<ProductDetailPage />}
        />

        <Route
          path={routePath.ADDPRODUCT}
          element={
            <VendorProtectedRouter>
              <ManageProducts />
            </VendorProtectedRouter>
          }
        />
      </Routes>
      {/* // vendor */}
      <Routes></Routes>

      {/* admin protected */}
      <Routes>
        <Route
          path={routePath.DASHBOARD}
          element={
            <AdminProtectedRouter>
              <AdminDashboard />
            </AdminProtectedRouter>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
