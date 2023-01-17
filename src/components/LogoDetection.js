import { useState } from "react";
import Container from "react-bootstrap/Container";
import ToggleVisibility from "./ToggleVisibility";
import FaceRecognition from "./FaceRecognition";
import ImageLinkForm from "./ImageLinkForm";
import DescriptionArea from "./DescriptionArea";
import "../index.css";

const LogoDetection = () => {
  const [state, setState] = useState({
    input: "",
    imageUrl: "",
    box: [],
    brandNames: [],
    percentage: 0,
  });

  const calculateLogoLocation = (result) => {
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

  const retrieveLogoNames = (result) => {
    // const logoName = result.outputs[0].data.regions[0].data.concepts[0];
    const logoName = result.outputs[0].data.regions;
    if (logoName !== undefined) {
      return logoName.flatMap((logo) => {
        const allLogos = logo.data.concepts.map((concept) => {
          return concept.name;
        });
        // returns strings with all the name logos in the picture
        return allLogos;
      }); // return flattened string[]
    }
  };

  const onInputChange = (e) => {
    setState({ input: e.target.value });
  };

  const onButtonSubmit = (e) => {
    setState({ imageUrl: state.input });
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const logoNames = retrieveLogoNames(result);
        const logoLocation = calculateLogoLocation(result);
        setState({
          ...state,
          brandNames: logoNames,
          box: logoLocation,
          imageUrl: state.input,
        });
      })
      .catch((error) => console.log("error", error));
  };

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
          Paste an img url below and the App will scan the logos in the
          picture/s
        </p>
        <ToggleVisibility>
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={state.imageUrl} box={state.box} />
          <DescriptionArea brandNames={state.brandNames} />
        </ToggleVisibility>
      </div>
    </Container>
  );
};

export default LogoDetection;
