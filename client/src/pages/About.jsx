import React from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


export default function AboutUs() {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7415d04f090ef15887d955ffd7ffaf7602215d961a11f3adb2e6f1609ca1c53f?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" className="img-2" />
          <div className="div-12">About Us</div>
        </div>
        <div className="div-13">
          <div className="div-14">
            <div className="column">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc5e0c6c0d029721b979287b4751c89c579ba04ca27219f6c8933543a49a0223?apiKey=fe3b0463a8ae420ab1241e00fcde5d70&" className="img-3" />
            </div>
            <div className="column-2">
              <div className="div-15">
                <div className="div-16">Fridge Inc.</div>
                <div className="div-17">
                  Welcome to Fridge Inc., your destination for healthy,
                  budget-friendly eating solutions. Our platform helps you
                  discover nutritious recipes using ingredients you already have
                  at home. Say goodbye to food waste and hello to delicious,
                  wallet-friendly meals! Join us in revolutionizing the way we
                  eat – one recipe at a time.
                </div>
                <div className="div-18" />
                <div className="div-19">Have any questions? Contact Us!</div>
                <div className="div-20">408-123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          padding-bottom: 57px;
          flex-direction: column;
        }
        .div-2 {
          background-color: #f0ece1;
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          color: #3e2723;
          padding: 19px 12px 69px;
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
          margin-top: 33px;
          font: 700 54px/107% Raleway, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-12 {
            font-size: 40px;
          }
        }
        .div-13 {
          align-self: center;
          margin-top: 97px;
          width: 100%;
          max-width: 1364px;
        }
        @media (max-width: 991px) {
          .div-13 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-14 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-14 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .img-3 {
          aspect-ratio: 1.3;
          object-fit: auto;
          object-position: center;
          width: 100%;
          flex-grow: 1;
        }
        @media (max-width: 991px) {
          .img-3 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-15 {
          display: flex;
          margin-top: 33px;
          flex-direction: column;
          font-size: 40px;
          color: #3e2723;
          font-weight: 700;
          line-height: 145%;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-15 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-16 {
          font-family: Raleway, sans-serif;
        }
        @media (max-width: 991px) {
          .div-16 {
            max-width: 100%;
          }
        }
        .div-17 {
          letter-spacing: 0.4px;
          margin-top: 25px;
          font: 400 20px/24px Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-17 {
            max-width: 100%;
          }
        }
        .div-18 {
          border-color: rgba(62, 39, 35, 1);
          border-style: solid;
          border-width: 1px;
          background-color: #3e2723;
          margin-top: 30px;
          height: 1px;
        }
        @media (max-width: 991px) {
          .div-18 {
            max-width: 100%;
          }
        }
        .div-19 {
          margin-top: 46px;
          font: 600 24px/242% Raleway, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-19 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-20 {
          font-family: Raleway, sans-serif;
          margin-top: 39px;
        }
        @media (max-width: 991px) {
          .div-20 {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}