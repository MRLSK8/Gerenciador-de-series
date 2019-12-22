import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("/api/genres").then(response => {
      setData(response.data.data);
    });
  }, []);

  const renderLine = data => {
    return (
      <tr key={data.id}>
        <th scope="row">{data.id}</th>
        <td>{data.name}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteGenre(data.id)}
          >
            Remover
          </button>
          <Link to={"/generos/" + data.id} className="btn btn-warning" > Editar</Link>
        </td>
      </tr>
    );
  };

  const deleteGenre = id => {
    Axios.delete("/api/genres/" + id).then(response => {
      const dataFiltered = data.filter(item => id !== item.id);
      setData(dataFiltered);
    });
  };

  if (data.length === 0) {
    return (
      <div>
        <h1>Gêneros</h1>
        <Link to="/generos/novo" className="btn btn-primary" > Adicionar gênero</Link>
        <div className="alert alert-warning" role="alert">
          Você não possui gêneros criados!
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Generos</h1>
      <Link to="/generos/novo" className="btn btn-primary"> Adicionar gênero</Link>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{data.map(renderLine)}</tbody>
      </table>
    </div>
  );
};

export default Generos;
