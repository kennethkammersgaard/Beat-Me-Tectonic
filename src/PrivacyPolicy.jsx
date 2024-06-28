import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h1>Privatlivspolitik</h1>
      <p>Vi tager dit privatliv alvorligt. Her er vores politik for indsamling og brug af personlige oplysninger:</p>
      <ol>
        <li>Vi indsamler kun de oplysninger, der er nødvendige for at levere vores tjenester.</li>
        <li>Dine personlige oplysninger vil aldrig blive solgt eller delt med tredjeparter uden din tilladelse.</li>
        <li>Vi bruger sikre metoder til at beskytte dine oplysninger mod uautoriseret adgang.</li>
        <li>Du har ret til at anmode om indsigt i, rettelse eller sletning af dine personlige oplysninger.</li>
        <li>Vi bruger cookies til at forbedre din brugeroplevelse på vores website.</li>
      </ol>
      <Link to="/">Tilbage til spillet</Link>
    </div>
  );
}

export default PrivacyPolicy;
