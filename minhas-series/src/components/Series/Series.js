import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get('/api/series').then(response => {
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
            onClick={() => deleteSerie(data.id)}
          >
            Remover
          </button>
          <Link to={'/series/' + data.id} className="btn btn-warning">
            info
          </Link>
        </td>
      </tr>
    );
  };

  const deleteSerie = id => {
    Axios.delete('/api/series/' + id).then(response => {
      const dataFiltered = data.filter(item => id !== item.id);
      setData(dataFiltered);
    });
  };

  if (data.length === 0) {
    return (
      <div>
        <h1>Séries</h1>
        <Link to="/series/novo" className="btn btn-primary">
          Adicionar séries
        </Link>
        <div className="alert alert-warning" role="alert">
          Você não possui séries criadas!
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Séries</h1>
      <Link to="/series/novo" className="btn btn-primary">
        Adicionar séries
      </Link>
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

export default Series;
