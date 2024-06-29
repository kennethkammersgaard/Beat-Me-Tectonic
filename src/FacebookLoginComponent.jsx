import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function FacebookLoginComponent({ setUser }) {
  const responseFacebook = (response) => {
    setUser({
      name: response.name,
      city: response.location?.name || "Unknown",
    });
  };

  return (
    <FacebookLogin
      appId="993897072203300"
      autoLoad={true}
      fields="name,location"
      callback={responseFacebook}
      render={renderProps => (
        <button onClick={renderProps.onClick}>Login with Facebook</button>
      )}
    />
  );
}

export default FacebookLoginComponent;
