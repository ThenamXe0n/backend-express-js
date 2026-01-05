import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router";
import { routePath } from "./routes/routePath";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import ProductUploadForm from "./components/forms/ProductUploadForm";
import ManageProducts from "./pages/ManageProducts";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={routePath.HOME} element={<h1>Home</h1>} />
        <Route path={routePath.LOGIN} element={<LoginPage />} />
        <Route path={routePath.REGISTER} element={<RegisterPage />} />
        <Route path={routePath.ADDPRODUCT} element={<ManageProducts/>} />
      </Routes>
    </>
  );
}

export default App;
