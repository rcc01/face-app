const getImageUrl = (person, size = "s") => {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
};

const Avatar = ({ person, size }) => {
  return (
    <>
      <img
        className="avatar--img"
        src={getImageUrl(person)}
        alt={person.name}
        width={size}
        height={size}
      />
    </>
  );
};

export default Avatar;
