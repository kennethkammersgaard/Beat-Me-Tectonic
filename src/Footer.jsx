import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLoginComponent from './FacebookLoginComponent';

function Footer({ user, setUser }) {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', textAlign: 'center', padding: '10px 0' }}>
      <Link to="/terms" style={{ marginRight: '10px' }}>Vilkår for brug</Link>
      <Link to="/privacy">Privatlivspolitik</Link>
      {!user && (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <FacebookLoginComponent setUser={setUser} />
        </div>
      )}
    </footer>
  );
}

export default Footer;
