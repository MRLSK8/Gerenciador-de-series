import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({name: ''});
  const [success, setSucces] = useState(false);
  const [data, setData] = useState({ status: 'PARA_ASSISTIR' });
  const [mode, setMode] = useState('INFO');
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState();

  useEffect(() => {
    axios.get('/api/series/' + match.params.id).then(response => {
      setData(response.data);
      setForm(response.data);
      setGenreId(response.data.genre_id);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get('/api/genres').then(response => {
      setGenres(response.data.data);
    });
  }, [data]);

  const onChangeGenre = event => {
    console.log(event.target.value);
    setGenreId(event.target.value);
    setForm({ ...form, genre_id: event.target.value });
  };

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundReapeat: 'no-reapeat'
  };

  const handleInput = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  };

  const seleciona = value => () => {
    setForm({ ...form, status: value });
  };

  const handleSave = () => {
    axios.put('/api/series/' + match.params.id, form).then(Response => {
      setSucces(true);
    });
  };

  if (success) {
    return <Redirect to='/series' />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img
                  className='img-fluid img-thumbnail'
                  src={data.poster}
                  atl={data.name}
                />
              </div>
              <div className='col-9'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'ASSISTIDO' ? (
                    <Badge color='success'>Assistido</Badge>
                  ) : (
                    <Badge color='warning'>Para assistir</Badge>
                  )}
                </div>
                {form.genre ? (
                  <div className='font-weight-light text-white'>
                    Gênero: {data.genre}
                  </div>
                ) : (
                  <div className='font-weight-light text-white' > Gênero: ...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='container'>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>
          Editar
        </button>
      </div>

      {mode === 'EDIT' && (
        <div className='container'>
          <h1>Séries</h1>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                value={form.name}
                className='form-control'
                id='name'
                aria-describedby='Campo de nome'
                placeholder='Nome da série'
                onChange={handleInput('name')}
              />

              <label htmlFor='comments'>Comentários</label>
              <input
                type='text'
                value={form.comments }
                className='form-control'
                id='comments'
                aria-describedby='Campo de comentarios'
                placeholder='Comentario sobre a série'
                onChange={handleInput('comments')}
              />
              <div className='form-group'>
                <label htmlFor='select' value='select'>
                  Gêneros
                </label>
                <select
                  id='select'
                  className='form-control'
                  onChange={onChangeGenre}
                  value={genreId}
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='status'
                  id='assistido'
                  value='ASSISTIDO'
                  checked={form.status === 'ASSISTIDO'}
                  onChange={seleciona('ASSISTIDO')}
                />
                <label className='form-check-label' htmlFor='assistido'>
                  Assistido
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='status'
                  id='paraAssistir'
                  value='PARA_ASSISTIR'
                  checked={form.status !== 'ASSISTIDO'}
                  onChange={seleciona('PARA_ASSISTIR')}
                />
                <label className='form-check-label' htmlFor='paraAssistir'>
                  Para assistir
                </label>
              </div>
            </div>

            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSave}
            >
              Salvar
            </button>

            <button className='btn btn-primary' onClick={() => setMode('INFO')}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
