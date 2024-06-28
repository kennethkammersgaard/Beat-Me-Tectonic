import React from 'react';

function TermsOfService({ setGameState }) {
  return (
    <div className="terms-of-service">
      <h1>Terms of Service</h1>
      <p>Velkommen til vores spil. Ved at bruge dette spil accepterer du følgende vilkår:</p>
      <ol>
        <li>Du må kun bruge spillet til personlig, ikke-kommerciel brug.</li>
        <li>Du må ikke kopiere, modificere eller distribuere spillet uden tilladelse.</li>
        <li>Vi forbeholder os retten til at ændre eller afslutte spillet når som helst.</li>
        <li>Vi er ikke ansvarlige for eventuelle tab eller skader, der opstår som følge af din brug af spillet.</li>
        <li>Du er ansvarlig for at holde din konto sikker.</li>
      </ol>
      <button onClick={() => setGameState("game")}>Tilbage til spillet</button>
    </div>
  );
}

export default TermsOfService;
