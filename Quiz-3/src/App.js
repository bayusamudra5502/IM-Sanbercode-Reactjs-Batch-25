import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./component/header";
import Content from "./component/Content";
import Footer from "./component/footer";
import { LoginProvider } from "./component/Context/LoginContext";
import "./assets/css/style.css";
import "./index.css";

function App() {
  return (
    <Router>
      <LoginProvider>
        <Header />
        <Content />
        <Footer />
      </LoginProvider>
    </Router>
  );
}

export default App;
