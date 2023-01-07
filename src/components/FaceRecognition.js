import "../App.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="pa1 flex justify-center">
      <div className="relative mt3">
        <img
          id="inputImage"
          alt=""
          className="mt-6 br3 items-center-ns"
          src={imageUrl}
          width="500"
          height="auto"
        />
        {box !== undefined &&
          box.map((box) => {
            return (
              <div
                key={box.topRow}
                className="bounding-box"
                style={{
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol,
                }}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default FaceRecognition;
