import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import Footer from './components/Footer';
import Page404 from './Page404';
import './global-styles/global.css';
import './global-styles/App.css';
import './global-styles/Sidebar.css';
import './global-styles/Main.css';


function App() {
  const [devs, setDevs] = useState([]);
  const [hasNetwork, setHasNetwork] = useState(true);
  const [hasChange, setHasChange] = useState(false)

  useEffect(() => {
    async function loadDevs() {
      await api.get('/devs')
        .then(response => {
          setDevs(response.data)
          console.log('LOADED');
        })
        .catch(error => {
          console.log('ERROR: ' + error.response);
          setHasNetwork(false);
        })
    }
    loadDevs();
  }, [hasChange])

  async function handleAddDev(data) {
    await api.post('/devs', data)
      .then(response => { setDevs([...devs, response.data]) }
      )
      .catch(error => {
        console.log('ERROR: ' + JSON.stringify(error.response.data.error))
      })
  }

  async function handleRemoveDev(data) {
    await api.delete('/devs', {
      params: {
        github_username: data
      }
    })
      .then(
        await api.get('/devs')
          .then(response => {
            setDevs(devs)
            console.log("REMOVED");
          })
          .catch(error => {
            console.log('ERROR: ' + error.response)
          })
      )
      setHasChange(!hasChange);
  }



    async function handleUpdateDev(data) {

      await api.put('/devs', data)
        .then(
          await api.get('/devs')
          
          .then(response => { setDevs(response.data) 
            console.log("UPDATED!");
          }
          )
            .catch(error => {
              console.log('ERROR: ' + error.response)
            })
        )
        setHasChange(!hasChange);
    }




  if (hasNetwork) {
    return (
      <>
      <Header/>
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>
        <main>
          <ul>
            {devs.map((dev, index) => (
              <DevItem key={index} dev={dev} onDelete={handleRemoveDev} onUpdate={handleUpdateDev} />
            ))}
          </ul>
        </main>
      </div>
      <Footer/>
      </>
    );
  }
  else {
    return (
      <>
      <Header/>
      <Page404 />
      <Footer/>
      </>
    )
  }
}
export default App;
