const StoreInfo = ({ address, placeName, categoryName }) => {
  const img = 'img';
  return (
    <>
      <h2>{placeName}</h2>
      <div>
        <div>{img}</div>
        <div>{placeName}</div>
        <div>{address}</div>
        <div>{categoryName}</div>
      </div>
    </>
  );
};

export default StoreInfo;
