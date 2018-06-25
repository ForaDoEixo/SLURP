import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
    <nav className="Main-nav">
        <div>
            <h1>SLURP</h1>
            <ul>
                <NavLink to="/main">Main</NavLink>
                <NavLink to="/stats">stats</NavLink>
            </ul>
        </div>
        <NavLink to="/settings">Settings</NavLink>
    </nav>
)

export { NavBar as default }
