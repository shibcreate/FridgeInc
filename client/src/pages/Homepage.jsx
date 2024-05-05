import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function Homepage({ isLoggedIn, setIsLoggedIn }) {
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/', {
          withCredentials: true
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuthentication();
  }, [isLoggedIn]);

  return (
    <>
      <div className="div">
        <div className="div-2">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" className="img-2" />
          <div className="div-12">Can't Decide What To Cook?</div>
          <div className="div-13">
            Snap a Picture, Cook a Masterpiece, Discover recipes based on
            what's in your fridge today!
          </div>
          <div className="div-14">
            <Link to="/about" className="div-15">About Us</Link>
            <Link to="/recipes" className="div-16">Explore Recipes</Link>
          </div>
        </div>
        <div className="img-3-container">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/28c43c22084763b3b93dbf0ca473ff22f2cd823bb9bf0d7d0e5d8f164846785f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" className="img-3" />
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .div-2 {
          background-color: #f0ece1;
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          padding: 19px 12px 80px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            padding-right: 20px;
          }
        }
        .img-2 {
          aspect-ratio: 1.25;
          object-fit: auto;
          object-position: center;
          width: 83px;
          margin-top: 56px;
        }
        @media (max-width: 991px) {
          .img-2 {
            margin-top: 40px;
          }
        }
        .div-12 {
          color: #3e2723;
          margin-top: 58px;
          font: 700 54px/107% Raleway, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-12 {
            max-width: 100%;
            margin-top: 40px;
            font-size: 40px;
          }
        }
        .div-13 {
          color: #3e2723;
          text-align: center;
          letter-spacing: 0.4px;
          margin-top: 26px;
          width: 580px;
          font: 400 20px/24px Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .div-13 {
            max-width: 100%;
          }
        }
        .div-14 {
          justify-content: center;
          display: flex;
          gap: 12px;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          line-height: 156%;
          margin: 26px 0 31px;
        }
        .div-15 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 12px;
          border-color: rgba(213, 206, 187, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #f0ece1;
          color: #3e2723;
          padding: 8px 16px;
          text-decoration: none;
        }
        .div-16 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 12px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          color: #fff;
          padding: 8px 16px;
          text-decoration: none;
        }
        .img-3-container {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .img-3 {
          aspect-ratio: 1.96;
          object-fit: auto;
          object-position: center;
          width: 1008px;
          align-self: center;
          z-index: 10;
          margin-top: -117px;
          max-width: 100%;
          margin-left: 75px;
        }
      `}</style>
    </>
  );
}

export default Homepage;
