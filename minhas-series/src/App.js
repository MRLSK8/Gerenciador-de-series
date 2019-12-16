import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NovoGenero from "./components/NovoGenero";
import Generos from "./components/Generos";
import Header from "./components/Header";
import EditarGeneros from "./components/EditarGenero";
import Axios from "axios";

const Home = () => {
  return <h1>Home</h1>;
};

function App() {
  const [data, setDate] = useState([]);

  useEffect(() => {
    Axios.get("/api").then(response => {
      setDate(response.data.info);
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/generos" component={Generos} />
        <Route exact path="/generos/:id" component={EditarGeneros} />
        <Route exact path="/generos/novo" component={NovoGenero} />
      </div>
    </BrowserRouter>
  );
}

export default App;
