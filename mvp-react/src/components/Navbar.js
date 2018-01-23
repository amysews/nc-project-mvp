import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/users"> Users</NavLink>
            { '  |  ' }
            <NavLink to="/questions">Questions</NavLink>


        </nav>

    )
}

export default Navbar;