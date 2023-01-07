import "../App.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <div className="input-box">
        <div className="form pa4 br3 shadow-1">
          <input
            type="text"
            className="f4 pa2 w-80 center"
            onChange={onInputChange}
          />
          <button
            className="w-15 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
