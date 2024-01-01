"use client";
import React, { useEffect, useRef, useState } from "react";

const VideoCall = () => {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const callerPeerId = "658b25f712262d49162a279c"; // Replace with the caller's peer ID
  const receiverPeerId = "6589c41680c708e50eac4281"; // Replace with the receiver's peer ID
  const [isClient, setIsClient] = useState(false);
  const peerInstance = useRef(null); // Initialize peerInstance
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined"
    ) {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      import("peerjs")
        .then((PeerJS) => {
          const Peer = PeerJS.default || PeerJS;
          const peer = new Peer(callerPeerId);

          peer.on("open", (callerPeerId) => {
            console.log("callerPeerId", callerPeerId);
          });

          peer.on("call", (call) => {
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then(function (stream) {
                setLocalStream(stream);
                localVideoRef.current.srcObject = stream;
                localVideoRef.current.play();
                call.answer(stream);

                call.on("stream", function (remoteStream) {
                  // Update the remote stream state here
                  setRemoteStream(remoteStream);

                  // Display the remote stream on the video element
                  remoteVideoRef.current.srcObject = remoteStream;
                  remoteVideoRef.current.play();
                });
              })
              .catch(function (err) {
                console.log("Failed to get local stream", err);
              });
          });

          peerInstance.current = peer;
        })
        .catch((error) => {
          console.error("Error loading PeerJS:", error);
        });
    }
  }, [isClient]);

  const callPeer = () => {
    if (isClient) {
      import("peerjs")
        .then((PeerJS) => {
          const Peer = PeerJS.default || PeerJS;
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(function (stream) {
              setLocalStream(stream);
              localVideoRef.current.srcObject = stream; // Display local stream
              localVideoRef.current.play();
              const peer = new Peer(receiverPeerId);

              peer.on("open", (receiverPeerId) => {
                console.log("Connected to receiverPeerId");
                const call = peer.call(receiverPeerId, stream);

                call.on("stream", function (remoteStream) {
                  setRemoteStream(remoteStream);
                });
              });

              peerInstance.current = peer;
            })
            .catch(function (err) {
              console.log("Failed to get local stream", err.name, err.message);
            });
        })
        .catch((error) => {
          console.error("Error loading PeerJS:", error);
        });
    }
  };

  useEffect(() => {
    callPeer();
  }, [isClient]);
  useEffect(() => {
    // Check if remoteStream is set and update the video element
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play();
    }
  }, [remoteStream]);

  const handleCall = () => {
    callPeer();
  };

  if (!isClient) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="h-[100%] w-auto mx-5 flex flex-row items-center justify-center gap-4">
      <div
        id="doctor"
        className="h-[60%] w-[45%] border-2 border-black relative"
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="h-full w-full object-cover"
        />
        <p className="absolute top-2 left-2 text-white">Vet Doctor</p>
      </div>
      <div className="w-auto flex flex-col gap-2">
        <div
          className="text-center rounded-xl p-2 cursor-pointer bg-slate-300"
          onClick={handleCall}
        >
          Receive
        </div>
        <div className="text-center rounded-xl p-2 cursor-pointer bg-red-500">
          End
        </div>
      </div>
      <div
        id="petowner"
        className="h-[60%] w-[45%] border-2 border-black relative"
      >
        {remoteStream && (
          <video
            ref={remoteVideoRef}
            autoPlay
            className="h-full w-full object-cover"
            srcObject={remoteStream}
          />
        )}
        <p className="absolute top-2 left-2 text-white">Pet Owner</p>
      </div>
    </div>
  );
};

export default VideoCall;
