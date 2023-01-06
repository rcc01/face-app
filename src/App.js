import { useState } from "react";
import ImageLinkForm from "./components/ImageLinkForm";
import Navbar from "./components/Navbar";
import Avatar from "./components/Avatar";
import "./App.css";
import "./input.css";
import ToggleVisibility from "./components/ToggleVisibility";
import FaceRecognition from "./components/FaceRecognition";

const App = () => {
  const [state, setState] = useState({ input: "", imageUrl: "", box: [] });

  const calculateFaceLocation = (result) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    if (result.outputs[0].data.regions !== undefined) {
      return result.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    }
  };

  const onInputChange = (e) => {
    setState({ input: e.target.value });
  };

  const displayFaceBox = (box) => {
    setState({ box: box, imageUrl: state.input });
    console.log(box);
  };

  const onButtonSubmit = (e) => {
    console.log("click!");
    setState({ imageUrl: state.input });
    console.log(state.input);
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      // result.outputs[0].data.regions[0].region_info.bounding_box
      // .then((result) => console.log(result))

      .then((result) => displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
    // .then((result) => console.log(displayFaceBox(calculateFaceLocation(result)))
  };

  const USER_ID = "ch68ksmt7744";
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "74fd5e2da34448e9b999f1a2da3154d8";
  const APP_ID = "89500fa210b74d44aaca62a32a76ccfb";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
  const IMAGE_URL = state.input;
  // "https://img.freepik.com/premium-psd/adult-man-nutural-confident-portrait-concept_53876-22253.jpg?w=2000";

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return (
    <div>
      <Navbar />
      <div className="container--avatar">
        <Avatar
          size={100}
          person={{
            name: "Katsuko Saruhashi",
            imageId: "YfeOqp2",
            title: "lol",
          }}
        />
        <Avatar
          size={100}
          person={{
            name: "Aklilu Lemma",
            imageId: "OKS67lh",
            title: "image2",
          }}
        />
        <Avatar
          size={100}
          person={{
            name: "Lin Lanying",
            imageId: "1bX5QH6",
            title: "image3",
          }}
        />
        <Avatar
          size={100}
          person={{
            name: "Katsuko Saruhashi",
            imageId: "YfeOqp2",
            title: "image4",
          }}
        />
      </div>

      <p className="f3 mt-4 ml-3 mb-4">
        This app will detect faces in your pictures
      </p>
      <ToggleVisibility>
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
        <FaceRecognition imageUrl={state.imageUrl} box={state.box} />
      </ToggleVisibility>
    </div>
  );
};

export default App;
