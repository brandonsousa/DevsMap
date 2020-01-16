import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './style.css'

function DevForm( { onSubmit } ){

    const [github_username, setGithubUsername] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    
    useEffect(() =>{
          navigator.geolocation.getCurrentPosition((position) =>{
          const {latitude, longitude} = position.coords
          
          setLatitude(latitude)
          setLongitude(longitude)

        }, (err) =>{
          alert(err)
        },{
          timeout: 50000
        })
    }, [])

    async function handleSaveDev(e){
        e.preventDefault()
        await onSubmit({
          github_username,
          techs,
          latitude,
          longitude
        })

        setGithubUsername('')
        setTechs('')
    }

    return(
        <form onSubmit={handleSaveDev}>
          <div className="input-block">
            <label htmlFor="github_username">Github User</label>
            <input 
              name="github_username"
              id="github_username" 
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Your techs</label>
            <input 
              name="techs" 
              id="techs"
              value={techs}
              onChange={e => setTechs(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude} 
                onChange={e => setLatitude(e.target.value)}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude"
                id="longitude" 
                value={longitude} 
                onChange={e => setLongitude(e.target.value)}
                required
               />
            </div>
          </div>  

          <button type="submit">SignUp</button>
        </form>
    )
}

export default DevForm