import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="container">
            <div className="vehicle-grid">
            <div className ="vehicle-display"><Link to="/avail">vehicle</Link></div>
            <div className ="vehicle-display"><Link to="/todo">todo</Link></div>
            <div className ="vehicle-display"><Link to="/datalist">data sorted in react</Link></div>
            <div className ="vehicle-display"><Link to="/datarender">data sorted in server</Link></div>
            <div className ="vehicle-display"><Link to="/tree">Tree</Link></div>
            </div>
            </div>
    )
}
