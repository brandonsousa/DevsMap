import React from 'react'
import './style.css'

function DevCard({dev}){
    return(
        <li className="dev-card">
              <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="dev-info">
                  <strong>{dev.name} ({dev.github_username})</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>See on Github</a>
        </li>
    )
}

export default DevCard