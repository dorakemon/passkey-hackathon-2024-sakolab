"use client";

import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export default () => {
  const handleRegistration = async () => {
    const response = await fetch("/wallet/api/fido/register");

    let registrationResponse;
    try {
      const opts = await response.json();

      registrationResponse = await startRegistration(opts);
      console.log(JSON.stringify(registrationResponse));
    } catch (error) {
      throw error;
    }

    const verificationResponse = await fetch("/wallet/api/fido/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationResponse),
    });

    const verificationJSON = await verificationResponse.json();
    if (verificationJSON && verificationJSON.verified) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  };

  const handleAuthentication = async () => {
    const response = await fetch("/wallet/api/fido/authenticate");

    let authenticationResponse;
    try {
      const opts = await response.json();

      authenticationResponse = await startAuthentication(opts);
      console.log(JSON.stringify(authenticationResponse));
    } catch (error) {
      throw error;
    }

    const verificationResponse = await fetch("/wallet/api/fido/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authenticationResponse),
    });

    const verificationJSON = await verificationResponse.json();
    if (verificationJSON && verificationJSON.verified) {
      alert("Authentication successful");
    } else {
      alert("Authentication failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>This is Wallet Home</div>

      <section>
        <button id="registration" onClick={handleRegistration}>
          Register
        </button>
      </section>
      <section>
        <button id="authentication" onClick={handleAuthentication}>
          Authenticate
        </button>
      </section>
    </main>
  );
};
