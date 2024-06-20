import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { redirect } from "next/navigation";

export const useFidoClient = () => {
  const handleRegistration = async (formData: FormData) => {
    const email = formData.get("email") as string;
    if (!email) {
      alert("Please enter an email address");
      return;
    }
    const response = await fetch("/wallet/api/fido/registration/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
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

    console.log(verificationResponse);

    const verificationJSON = await verificationResponse.json();
    if (verificationJSON && verificationJSON.verified) {
      alert("Registration successful");
      redirect("/wallet/credentials");
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
      redirect("/wallet/credentials");
    } else {
      alert("Authentication failed");
    }
  };

  return { handleRegistration, handleAuthentication };
};
