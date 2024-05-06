import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Register({isLoggedIn, setIsLoggedIn}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/authorized', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password validation logic
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@*\.])[A-Za-z\d!@*\.]{8,20}$/;
    if (!passwordRegex.test(password)) {
      console.error("Password does not meet requirements");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
      }, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        // Redirect or show success message
        console.log("Sign up successful");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if(isLoggedIn) {
    return (
      <h5 style={{margin: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>You are already logged in; if you wish to create a new account, please log out first</h5>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="div">
        <div className="div-2">
          <div className="column">
            <div className="div-3">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1a9d51fbd385eee4c2989303ee48d35020b4dffd72157d632cc081070e1f40d?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" className="img" />
              <div className="div-4">Sign Up</div>
              <div className="div-5">Welcome! Please create an account.</div>
              <div className="div-6">
                <div className="div-7" />
                <div className="div-8">
                  <div className="div-9">Name</div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="div-10"
                  />
                </div>
              </div>
              <div className="div-11">
                <div className="div-12" />
                <div className="div-13">
                  <div className="div-14">Email Address</div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="div-15"
                  />
                </div>
              </div>
              <div className="div-16">
                <div className="div-17" />
                <div className="div-18">
                  <div className="div-19">Password</div>
                  <input
                    type={passwordType}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="div-20"
                  />
                </div>
              </div>
              <div className="div-21">
                <label className="div-23">
                  <input type="checkbox" onChange={(e) => setPasswordType(e.target.checked ? "text" : "password")} /> Show Password
                </label>
              </div>
              <div className="div-24">
                Your password is case sensitive, must be at least 8-20
                characters long, <br /> contains at least one uppercase letter,
                one lowercase letter, one number, <br /> and one special
                characters (!, @, *, .) <br />
              </div>
              <div className="div-25">
                <button type="submit" className="div-26">Submit</button>
                <a href="/login" className="div-27">Login</a>
              </div>
            </div>
          </div>
          <div className="column-2">
            <div className="div-28">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ca6ddf5af2abada828e10d9683e0baf03737c1e18a7ef884cff6aff7967f16d?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" className="img-2" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          padding-left: 80px;
        }
        @media (max-width: 991px) {
          .div {
            padding-left: 20px;
          }
        }
        .div-2 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-2 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 44%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-3 {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          font-size: 18px;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .img {
          aspect-ratio: 4;
          object-fit: auto;
          object-position: center;
          width: 146px;
          max-width: 100%;
        }
        .div-4 {
          color: #3e2723;
          margin-top: 100px;
          font: 700 96px/60% Raleway, -apple-system, Roboto, Helvetica,
            sans-serif;
          text-align: left;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            margin-top: 40px;
            font-size: 40px;
          }
        }
        .div-5 {
          color: rgba(0, 0, 0, 0.6);
          font-family: Inter, sans-serif;
          font-weight: 400;
          margin-top: 57px;
          text-align: left;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-6 {
          border-color: rgba(193, 187, 187, 1);
          border-style: solid;
          border-top-width: 1px;
          border-right-width: 1px;
          border-left-width: 1px;
          background-color: #fff;
          display: flex;
          margin-top: 17px;
          gap: 20px;
          white-space: nowrap;
          padding: 1px 80px 1px 0;
        }
        @media (max-width: 991px) {
          .div-6 {
            flex-wrap: wrap;
            padding-right: 20px;
            white-space: initial;
          }
        }
        .div-7 {
          border-color: rgba(62, 39, 35, 1);
          border-style: solid;
          border-width: 3px;
          background-color: #3e2723;
          width: 3px;
          height: 72px;
        }
        .div-8 {
          display: flex;
          flex-direction: column;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-8 {
            white-space: initial;
          }
        }
        .div-9 {
          color: rgba(0, 0, 0, 0.61);
          font-family: Roboto, sans-serif;
          font-weight: 400;
        }
        .div-10 {
          color: #3e2723;
          font-family: Inter, sans-serif;
          font-weight: 500;
          margin-top: 13px;
        }
        .div-11 {
          border-color: rgba(193, 187, 187, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #fff;
          z-index: 10;
          display: flex;
          gap: 20px;
          padding: 1px 80px 1px 0;
        }
        @media (max-width: 991px) {
          .div-11 {
            flex-wrap: wrap;
            padding-right: 20px;
          }
        }
        .div-12 {
          border-color: rgba(62, 39, 35, 1);
          border-style: solid;
          border-width: 3px;
          background-color: #3e2723;
          width: 3px;
          height: 72px;
        }
        .div-13 {
          display: flex;
          flex-direction: column;
          margin: auto 0;
        }
        .div-14 {
          color: rgba(0, 0, 0, 0.61);
          font-family: Roboto, sans-serif;
          font-weight: 400;
        }
        .div-15 {
          color: #3e2723;
          font-family: Inter, sans-serif;
          font-weight: 500;
          margin-top: 12px;
        }
        .div-16 {
          border-color: rgba(193, 187, 187, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #fff;
          display: flex;
          gap: 20px;
          white-space: nowrap;
          padding: 1px 80px 1px 0;
        }
        @media (max-width: 991px) {
          .div-16 {
            flex-wrap: wrap;
            padding-right: 20px;
            white-space: initial;
          }
        }
        .div-17 {
          border-color: rgba(62, 39, 35, 1);
          border-style: solid;
          border-width: 3px;
          background-color: #3e2723;
          width: 3px;
          height: 72px;
        }
        .div-18 {
          display: flex;
          flex-direction: column;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-18 {
            white-space: initial;
          }
        }
        .div-19 {
          color: rgba(0, 0, 0, 0.61);
          font-family: Roboto, sans-serif;
          font-weight: 400;
        }
        .div-20 {
          color: #3e2723;
          font-family: Inter, sans-serif;
          font-weight: 500;
          margin-top: 10px;
        }
        .div-20[type="text"] {
          color: #3e2723; /* Adjust color to your preference */
          font-family: Inter, sans-serif;
          font-weight: 500;
          margin-top: 10px;
        }
        .div-21 {
          align-self: start;
          display: flex;
          gap: 11px;
          color: rgba(0, 0, 0, 0.61);
          font-weight: 400;
          margin: 24px 0 0 57px;
        }
        @media (max-width: 991px) {
          .div-21 {
            margin-left: 10px;
          }
        }
        .div-22 {
          border-color: rgba(229, 229, 229, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #fff;
          align-self: start;
          width: 13px;
          height: 13px;
        }
        .div-23 {
          font-family: Inter, sans-serif;
          flex-grow: 1;
          flex-basis: auto;
        }
        .div-24 {
          color: rgba(0, 0, 0, 0.61);
          font-family: Inter, sans-serif;
          font-weight: 400;
          margin-top: 30px;
        }
        @media (max-width: 991px) {
          .div-24 {
            max-width: 100%;
          }
        }
        .div-25 {
          align-self: start;
          display: flex;
          margin-top: 53px;
          gap: 20px;
          font-weight: 600;
          white-space: nowrap;
          text-align: center;
          line-height: 156%;
          justify-content: space-between;
        }
        @media (max-width: 991px) {
          .div-25 {
            margin-top: 40px;
            white-space: initial;
          }
        }
        .div-26 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 5px;
          border-color: rgba(217, 114, 85, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #d97255;
          color: #fff;
          padding: 13px 16px;
        }
        @media (max-width: 991px) {
          .div-26 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-27 {
          font-family: Inter, sans-serif;
          justify-content: center;
          border-radius: 5px;
          border-color: rgba(62, 39, 35, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #fff;
          color: #3e2723;
          padding: 13px 16px;
          text-decoration: none;
        }
        @media (max-width: 991px) {
          .div-27 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 56%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-28 {
          background-color: #f0ece1;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          padding: 80px 23px;
        }
        @media (max-width: 991px) {
          .div-28 {
            max-width: 100%;
            margin-top: 27px;
            padding: 0 20px;
          }
        }
        .img-2 {
          aspect-ratio: 1.08;
          object-fit: auto;
          object-position: center;
          width: 100%;
          margin-top: 97px;
        }
        @media (max-width: 991px) {
          .img-2 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
      `}</style>
    </form>
  );
}
