import React, { useState } from 'react';
import './style.css';


function DevForm({ onSubmit, currentUseData }) {
    const github_username = currentUseData[0];
    const [name, setName] = useState(currentUseData[1]);
    const [avatar_url, setAvatar_url] = useState(currentUseData[2]);
    const [bio, setBio] = useState(currentUseData[3]);
    const [techs, setTechs] = useState(currentUseData[4]);
    const [latitude, setLatitude] = useState(currentUseData[5]);
    const [longitude, setLongitude] = useState(currentUseData[6]);


    async function handleSubmit(evt) {
        evt.preventDefault();
        await onSubmit({
            github_username,
            name,
            avatar_url,
            bio,
            latitude,
            longitude,
            techs
        });

      /*   setName('');
        setImage_url('');
        setBio('');
        setTechs(''); */
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder="Ex: Gaearon"
                    
                />
                
            </div>
            <div className="input-block">
                <label htmlFor="avatar_url">URL da imagem</label>
                <input type="url"
                    name="avatar_url"
                    id="avatar_url"
                    value={avatar_url}
                    onChange={event => setAvatar_url(event.target.value)}
                    placeholder="www.endereço..."  
                />
            </div>
            <div className="input-block">
                <label htmlFor="bio">Bio</label>
                <textarea
                    rows="5" cols="25"
                    name="bio"
                    id="bio"
                    value={bio || 'Bio ausente'}
                    onChange={event => setBio(event.target.value)}
                    placeholder="Fale sobre você..."
                    
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
                    
                />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text"
                        name="latitude"
                        id="latitude"
                        
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
                        
                        value={longitude}
                        onChange={event => setLongitude(event.target.value)}
                        placeholder="Sua latitude: -4x...."
                    />
                </div>
            </div>
            <button type="submit">Atualizar</button>
        </form>
    )
}

export default DevForm;