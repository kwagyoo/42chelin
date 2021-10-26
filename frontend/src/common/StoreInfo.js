const StoreInfo = ({ onClick, address, placeName, categoryName }) => {
  const img = 'img';
  return (
    <div onClick={onClick}>
      <h2>{placeName}</h2>
      <div>
        <div>{img}</div>
        <div>{placeName}</div>
        <div>{address}</div>
        <div>{categoryName}</div>
      </div>
    </div>
  );
};

export default StoreInfo;
