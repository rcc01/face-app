const DescriptionArea = ({ brandName }) => {
  console.log(brandName);
  return (
    <div>
      <p>{brandName !== undefined ? brandName : "Description Area"}</p>
    </div>
  );
};

export default DescriptionArea;
