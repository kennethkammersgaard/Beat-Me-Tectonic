import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ textAlign: 'center' }}>
      <Link to="/terms" style={{ marginRight: '10px' }}>Vilkår for brug</Link>
      <Link to="/privacy">Privatlivspolitik</Link>
    </footer>
  );
}

export default Footer;
