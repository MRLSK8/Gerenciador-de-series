import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const EditarGenero = ({ match }) => {
  const [name, setName] = useState("");
  const [success, setSucces] = useState(false);

  useEffect(() => {
    axios.get("/api/genres/" + match.params.id).then(Response => {
      setName(Response.data.name);
    });
  }, [match.params.id]);

  const handleInput = event => {
    setName(event.target.value);
  };

  const handleSave = () => {
    axios
      .put("/api/genres/" + match.params.id, {
        name
      })
      .then(Response => {
        setSucces(true);
      });
  };

  if (success) {
    return <Redirect to="/generos" />;
  }

  return (
    <div className="container">
      <h1> Editar Gênero</h1>
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
          Editar
        </button>
      </form>
    </div>
  );
};

export default EditarGenero;
