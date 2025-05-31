import React from 'react'
import homeImage from './Components/home1.jpg';

function Home() {
  const homePageStyle = {
    backgroundImage: `url(${homeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

  const homeContentStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px'
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '10px',
    color: '#fff'
  };

  const paragraphStyle = {
    fontSize: '1.5rem',
    color: '#fff'
  };

  return (
    <div style={homePageStyle} className="home-page">
      
      <div className="main-content">
        <div style={homeContentStyle} className="home-content">
          <h2 style={headingStyle}>Welcome to Human Life Well Being</h2>
          <p style={paragraphStyle}>HELLO!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
