import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from '../pages/Logout';

export default function CustomNavbar({ isLoggedIn, handleLogout }) {
  const [profileColor, setProfileColor] = useState(localStorage.getItem('userColor') || '#ffffff');

  useEffect(() => {
    const storedColor = localStorage.getItem('userColor');
    if (storedColor) {
      setProfileColor(storedColor);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('userColor', profileColor);
  }, [profileColor]);

  // Function to update profile color
  const handleUpdateProfileColor = (color) => {
    setProfileColor(color);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo-container">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/88f15c62e679e95fa2588e42a31e2692742c8c9ac72d8e5bfc559a4e43727226?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&"
            className="navbar__logo"
            alt="Logo"
          />
          <NavLink
            to="/"
            className="navbar__link"
            style={{ textDecoration: 'none', color: '#3e2723' }}
            activeclassName="active" 
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className="navbar__link"
            style={{ textDecoration: 'none', color: '#3e2723' }}
            activeclassName="active" 
          >
            Recipes
          </NavLink>
          <NavLink
            to="/custom-list"
            className="navbar__link"
            style={{ textDecoration: 'none', color: '#3e2723' }}
            activeclassName="active" 
          >
            Custom Recipes
          </NavLink>
          <NavLink
            to="/upload"
            className="navbar__link"
            style={{ textDecoration: 'none', color: '#3e2723' }}
            activeclassName="active" 
          >
            Upload
          </NavLink>
          {/* Render colored div next to Uploads link */}
          {isLoggedIn && (
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: profileColor,
                display: 'inline-block',
                marginLeft: '5px',
              }}
            ></div>
          )}
        </div>
        <div className="navbar__auth-container">
          {/* Conditionally render Log In or Log Out */}
          {isLoggedIn ? (
            <Logout handleLogout={handleLogout} />
          ) : (
            <NavLink
              to="/login"
              className="navbar__auth-link"
              style={{ textDecoration: 'none', color: '#3e2723' }}
              activeclassName="active" 
            >
              Log In
            </NavLink>
          )}
          {/* Conditionally render the Sign Up button */}
          {isLoggedIn ? (
            <>
              <NavLink to="/posts" 
              style={{ textDecoration: 'none', color: '#fff' }} 
              activeclassName="active" >
                <div className="navbar__auth-button">Posts</div>
              </NavLink>
            </>
          ) : (
            <NavLink to="/register" 
            style={{ textDecoration: 'none', color: '#fff' }}
            activeclassName="active" >
              <div className="navbar__auth-button">Sign Up</div>
            </NavLink>
          )}
        </div>
      </div>
      <style jsx>{`
        .navbar {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 19px 12px;
          background-color: #f0ece1;
        }

        @media (max-width: 991px) {
          .navbar {
            flex-direction: row;
            padding-right: 20px;
          }
        }

        .navbar__logo-container {
          display: flex;
          align-items: center;
          gap: 18px;
          font-size: 14px;
          font-weight: 400;
          white-space: nowrap;
          letter-spacing: 0.14px;
        }

        @media (max-width: 991px) {
          .navbar__logo-container {
            white-space: initial;
          }
        }

        .navbar__logo {
          aspect-ratio: 1.64;
          object-fit: contain;
          object-position: center;
          width: 105px;
          max-width: 100%;
        }

        .navbar__link {
          font-family: Inter, sans-serif;
          margin: auto 0;
          font-size: 16px;
        }

        .navbar__auth-container {
          display: flex;
          gap: 20px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.16px;
          justify-content: space-between;
          margin: auto 0;
        }

        .navbar__auth-link {
          font-family: Inter, sans-serif;
          margin: auto 0;
          cursor: pointer;
        }

        .navbar__auth-button {
          font-family: Inter, sans-serif;
          border-radius: 6px;
          box-shadow: 0px -1px 28px 0px rgba(255, 250, 240, 0.84);
          background-color: #d97255;
          justify-content: center;
          padding: 18px 36px;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .navbar__auth-button {
            padding: 0 20px;
          }
        }
        .navbar__link.active {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
