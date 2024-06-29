import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', textAlign: 'center', padding: '10px 0' }}>
      <Link to="/terms" style={{ marginRight: '10px' }}>Vilkår for brug</Link>
      <Link to="/privacy">Privatlivspolitik</Link>
    </footer>
  );
}

export default Footer;
