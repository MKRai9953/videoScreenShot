import { useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  async function getUserCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  }

  // clear Image
  const clearImage = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  // Get access to user's Camera
  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  // to take picture of user
  const takePicture = () => {
    let width = 4080;
    let height = width / (16 / 9);
    let photo = photoRef.current;
    let video = videoRef.current;

    // set photowidth and height

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, photo.width, photo.height);
  };
  return (
    <div className="App">
      <h1 className="text-center">Selfie App in React</h1>
      <video className="container" ref={videoRef} autoPlay playsInline></video>
      <button className="btn btn-danger container" onClick={takePicture}>
        Take Selfie
      </button>
      <canvas className="container" ref={photoRef}></canvas>
      <button onClick={clearImage} className="btn btn-primary container">
        Clear Image
      </button>
    </div>
  );
}

export default App;
