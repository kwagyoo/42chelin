const ReviewImgView = ({ image }) => {
  return (
    <>
      <img
        src={image}
        alt="reviewImg"
        style={{ width: '200px', height: '200px', paddingRight: '5%' }}
      />
    </>
  );
};

export default ReviewImgView;
