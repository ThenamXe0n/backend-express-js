import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router";
import { routePath } from "./routes/routePath";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={routePath.HOME} element={<h1>Home</h1>} />
        <Route path={routePath.LOGIN} element={<LoginPage />} />
        <Route path={routePath.REGISTER} element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
