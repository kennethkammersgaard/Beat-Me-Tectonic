import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', textAlign: 'center', padding: '10px 0' }}>
      <Link to="/terms" style={{ marginRight: '10px' }}>Vilkår for brug</Link>
      <Link to="/privacy">Privatlivspolitik</Link>
      {!user && (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <FacebookLogin
            appId="993897072203300"
            autoLoad={true}
            fields="name,location"
            callback={responseFacebook}
            render={renderProps => (
              <button onClick={renderProps.onClick}>Login with Facebook</button>
            )}
          />
        </div>
      )}
    </footer>
  );
}

export default Footer;
