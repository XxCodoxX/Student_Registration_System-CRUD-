import { lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
const Login = lazy(() => import("./Pages/Login.Page"));
const Home = lazy(() => import("./Pages/Home.Page"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
