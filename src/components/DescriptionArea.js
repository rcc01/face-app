import "../index.css";

const DescriptionArea = ({ brandNames }) => {
  console.log(brandNames);

  return (
    <div className="description-area">
      {brandNames !== undefined &&
        brandNames.map((brand, i) => {
          return (
            <ul key={i}>
              <li className="circle-checkmark">{brand}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default DescriptionArea;
