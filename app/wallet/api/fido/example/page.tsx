"use client";

import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export default () => {
  const handleRegistration = async () => {
    const email = document.getElementById("email") as HTMLInputElement;
    if (!email) {
      return;
    }
    const response = await fetch("/wallet/api/fido/registration/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });

    let registrationResponse;
    try {
      const opts = await response.json();

      registrationResponse = await startRegistration(opts);
      console.log(JSON.stringify(registrationResponse));
    } catch (error) {
      throw error;
    }

    const verificationResponse = await fetch(
      "/wallet/api/fido/registration/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationResponse),
      },
    );

    const verificationJSON = await verificationResponse.json();
    if (verificationJSON && verificationJSON.verified) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  };

  const handleAuthentication = async () => {
    const response = await fetch("/wallet/api/fido/authentication/generate");

    let authenticationResponse;
    try {
      const opts = await response.json();

      authenticationResponse = await startAuthentication(opts);
      console.log(JSON.stringify(authenticationResponse));
    } catch (error) {
      throw error;
    }

    const verificationResponse = await fetch(
      "/wallet/api/fido/authentication/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authenticationResponse),
      },
    );

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
        <input type="email" placeholder="Email" id="email" />
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
