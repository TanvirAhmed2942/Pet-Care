import React from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { useEffect } from "react";

function PhoneAuth({ auth, url }) {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start(".phone-auth", {
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      signInSuccessUrl: { url },
      privacyPolicyUrl: "/",
    });
    ui.disableAutoSignIn();
  }, []);
  // console.log("----", props.role + " " + props.id);
  return <div className="phone-auth"></div>;
}

export default PhoneAuth;
