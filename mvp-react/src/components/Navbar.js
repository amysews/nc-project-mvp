import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/"> Home</NavLink>
            {'  |  '}
            <NavLink to="/users"> Users</NavLink>
            {'  |  '}
            <NavLink to="/questions">Questions</NavLink>
            {'  |  '}
            <NavLink to="/submitQuestion">Submit a Question</NavLink>

        </nav>

    )
}

export default Navbar;