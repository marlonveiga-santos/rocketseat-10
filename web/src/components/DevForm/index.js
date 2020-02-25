import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    )
  }, [])

  async function handleSubmit(evt) {
    evt.preventDefault();
    await onSubmit({
      github_username,
      latitude,
      longitude,
      techs
    });

    setGithub_username('');
    setTechs('');
  }

  return (

    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário do Github</label>
        <input type="text"
          name="username_github"
          id="username_github"
          value={github_username}
          onChange={event => setGithub_username(event.target.value)}
          placeholder="Ex: Gaearon"
          required
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input type="text"
          name="techs"
          id="techs"
          value={techs}
          onChange={event => setTechs(event.target.value)}
          placeholder="Ex: react, vue"
          required
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="text"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={event => setLatitude(event.target.value)}
            placeholder="Sua latitude: -2x..."
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="text"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={event => setLongitude(event.target.value)}
            placeholder="Sua latitude: -4x...."
          />
        </div>
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default DevForm;