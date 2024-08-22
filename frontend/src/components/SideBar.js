import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 text-gray-800 flex flex-col p-5 shadow-lg">
            <div className="text-center mb-10">
                <h1 className="text-2xl font-bold">STORYKU</h1>
            </div>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg cursor-pointer transition duration-300 ${isActive ? 'bg-cyan-400 text-white' : 'hover:bg-cyan-400 hover:text-white'}`
                        }
                    >
                        <i className="fas fa-tachometer-alt mr-3"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/manage-story"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg cursor-pointer transition duration-300 ${isActive ? 'bg-cyan-400 text-white' : 'hover:bg-cyan-400 hover:text-white'}`
                        }
                    >
                        <i className="fas fa-book mr-3"></i>
                        <span>Story Management</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
