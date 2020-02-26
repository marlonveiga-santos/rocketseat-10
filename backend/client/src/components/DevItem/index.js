import React, { useState } from 'react';
import './style.css';
import UpdateForm from '../UpdateForm';

function DevItem({ dev, onDelete, onUpdate }) {
  const [toggleForm, setTogleForm] = useState(false);

  function ParseStringAsArray(arrayAsString) {
    var r = '';
    for (let x = 0; x < arrayAsString.length; x++) {
      if (x > 0) {
        r += ', ' + arrayAsString[x];
      }
      else {
        r += '' + arrayAsString[x];
      }
    }
    return r
  } 

  async function handleDelete(username) {
    await onDelete(
      username
    );
  }

  function handleToggleForm() {
    return setTogleForm(!toggleForm);
  }

  async function handleUpdate(data) {
    await onUpdate(
     data
    );
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name || dev.github_username}</strong>
          <span>{ParseStringAsArray(dev.techs).toUpperCase()}</span>
        </div>
      </header>
      <p>{dev.bio || "Bio Ausente"}</p>
      <div className="action">
        <button className="visit" onClick={() => window.open(`https://github.com/${dev.github_username}`) }>Visitar</button>
        <button className="update" onClick={() => handleToggleForm()}>Alterar</button>
        <button className="delete" onClick={() => handleDelete(dev.github_username)}>Excluir</button>
      </div>
      {toggleForm ? <UpdateForm itemForm={true}
        onSubmit={handleUpdate}
        currentUseData={[dev.github_username,dev.name,dev.avatar_url,dev.bio,ParseStringAsArray(dev.techs),dev.location.coordinates[0],dev.location.coordinates[1]]} />
        : <></>}
    </li>
  )
}
export default DevItem;