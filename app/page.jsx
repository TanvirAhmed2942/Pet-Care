// export default function App() {
//   const backgroundImage = "/assets/slide-1.jpg";
//   // console.log("s");
//   return (
//     <>
//       <div
//         className="w-[100%] h-[100%] bg-center bg-local bg-no-repeat bg-red-500"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       ></div>
//     </>
//   );
// }
export default function App() {
  const videoSource = "/assets/background-video.mp4"; // Update with your video source

  return (
    <>
      <div className="relative w-full h-screen -z-10">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover "
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
