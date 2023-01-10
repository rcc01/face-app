import { useState } from "react";
import Container from "react-bootstrap/Container";
import ToggleVisibility from "./ToggleVisibility";
import FaceRecognition from "./FaceRecognition";
import ImageLinkForm from "./ImageLinkForm";
import DescriptionArea from "./DescriptionArea";

const LogoDetection = () => {
  const [state, setState] = useState({
    input: "",
    imageUrl: "",
    box: [],
    brandName: "",
    percentage: 0,
  });

  const calculateLogoLocation = (result) => {
    // should I use the same function to ?
    console.log(result);
    const logoName = result.outputs[0].data.regions[0].data.concepts[0];
    console.log(logoName);
    const name =
      logoName.name.charAt(0).toUpperCase() + //Capitalize First Letter of Name
      logoName.name.slice(1);
    console.log(name);

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

  const displayLogoBox = (box) => {
    setState({ box: box, imageUrl: state.input });
    console.log(box);
  };

  const onButtonSubmit = (e) => {
    console.log("click!");
    setState({ imageUrl: state.input });
    // console.log(state.input);
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

      .then((result) => displayLogoBox(calculateLogoLocation(result)))

      .catch((error) => console.log("error", error));
    // getLogoName();
    // .then((result) => console.log(displayLogoBox(calculateLogoLocation(result)))
  };

  // const getLogoName = (response) => {
  //   console.log(response);
  // };

  const USER_ID = "ch68ksmt7744";
  const PAT = "74fd5e2da34448e9b999f1a2da3154d8";
  const APP_ID = "323";
  const MODEL_ID = "logos-yolov5";
  const MODEL_VERSION_ID = "a199488c92834f07a56a0f2244bf4710";
  const IMAGE_URL = state.input;

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
    <Container>
      <div className="main--container">
        <p className="brand">Logo Detection</p>
        <p className="description">
          Paste an img url below and the App will scan the logos in the picture
        </p>
        <ToggleVisibility>
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={state.imageUrl} box={state.box} />
          <DescriptionArea />
        </ToggleVisibility>
      </div>
    </Container>
  );
};

export default LogoDetection;
