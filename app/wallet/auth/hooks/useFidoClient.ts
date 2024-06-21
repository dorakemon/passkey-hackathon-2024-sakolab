import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";

export const useFidoClient = () => {
  const router = useRouter();
  const handleRegistration = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const recovery = formData.get("recovery") as string | "false";
    if (!email) {
      alert("Please enter an email address");
      return;
    }
    const response = await fetch("/wallet/api/fido/registration/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, recovery: recovery === "true" }),
    });

    let registrationResponse;
    try {
      const opts = await response.json();
      if (opts.error) {
        alert(opts.error);
        return;
      }
      registrationResponse = await startRegistration(opts);
      console.log(JSON.stringify(registrationResponse));
    } catch (error) {
      alert(error);
      return;
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
      // alert("Registration successful");
      router.replace("/wallet/credentials");
    } else {
      alert(`Registration failed.\n${verificationJSON.error}`);
    }
  };

  const handleAuthentication = async () => {
    const response = await fetch("/wallet/api/fido/authentication/generate");

    let authenticationResponse;
    try {
      const opts = await response.json();
      if (opts.error) {
        alert(opts.error);
        return;
      }
      authenticationResponse = await startAuthentication(opts);
      console.log(JSON.stringify(authenticationResponse));
    } catch (error) {
      alert(error);
      return;
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
      // alert("Authentication successful");
      router.replace("/wallet/credentials");
    } else {
      alert(`Authentication failed.\n${verificationJSON.error}`);
    }
  };

  return { handleRegistration, handleAuthentication };
};
