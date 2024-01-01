"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import PhoneAuth from "./PhoneAuth";

const firebaseConfig = {
  apiKey: "AIzaSyD4IwPRc3pvnI-RbbwGgeSXbBcj0Q_7dII",
  authDomain: "authpetapp.firebaseapp.com",
  projectId: "authpetapp",
  storageBucket: "authpetapp.appspot.com",
  messagingSenderId: "580271339259",
  appId: "1:580271339259:web:751664c0a0e69269de225e",
};

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function ForgotPassword(props) {
  const [user, setUser] = useState("");
  const [data, setData] = useState(0);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(
      firebase.auth(),
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser.phoneNumber);
        } else {
          setUser(null); // Handle if user is not authenticated
        }
      }
    );

    return () => unregisterAuthObserver();
  }, [user]);

  useEffect(() => {
    const fetchUsersID = async () => {
      if (user) {
        // console.log(user);
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/phn/${user}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const userInfo = await response.json();
          setData(userInfo);
          console.log("--", data._id);
          if (!data == 0) {
            if (data.role == "Pet Owner") {
              setUrl(`'/Profile/${data._id}'`);
            } else {
              setUrl(`'/Vet/${data._id}'`);
            }
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsersID();
  }, [user]);
  return (
    <div className="w-auto h-screen flex items-center justify-center">
      <div>
        <PhoneAuth auth={firebase.auth()} url={url} />
      </div>
    </div>
  );
}
