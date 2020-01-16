import React, {useState, useEffect} from 'react';

import api from './services/api'

import DevCard from './components/DevCard'
import DevForm from './components/DevForm'

import './global.css'
import './app.css'
import './sidebar.css'
import './main.css'

function App() {

  const [devs, setDevs] = useState([])

  useEffect(()=>{
    async function listDevs(){
      const response = await api.get()
      setDevs(response.data)
    }

    listDevs()
  },[])

  async function handleSaveDev(data){
      const response = await api.post('/devs', data)

      setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>SignUp</strong>
        <DevForm onSubmit={handleSaveDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
            <DevCard key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
