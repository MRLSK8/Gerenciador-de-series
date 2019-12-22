import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NovoGenero = () => {
  const [name, setName] = useState("");
  const [success, setSucces] = useState(false);

  const handleInput = event => {
    setName(event.target.value);
  };

  const handleSave = () => {
    axios
      .post("/api/genres", {
        name
      })
      .then(Response => {
        setSucces(true);
      });
  };

  if(success){
    return <Redirect to="/generos"/>
  }

  return (
    <div className="container">
      <h1>Generos</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            value={name}
            className="form-control"
            id="name"
            aria-describedby="Campo de nome"
            placeholder="Nome do Gênero"
            onChange={handleInput}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default NovoGenero;
