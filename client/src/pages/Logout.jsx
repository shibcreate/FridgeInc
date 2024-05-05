import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:3001/logout', {
                withCredentials: true
            });

            if (response.status === 202) {
                // Logout successful, call handleLogout to update state
                handleLogout();
                navigate('/');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <span className="navbar__auth-link" style={{ textDecoration: 'none', color: '#3e2723', cursor: 'pointer' }} onClick={logout}>
            Log Out
        </span>
    );
};

export default Logout;
