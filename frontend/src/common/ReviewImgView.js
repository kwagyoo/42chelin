const ReviewImgView = ({ image }) => {
  return (
    <>
      <img
        src={image}
        alt="reviewImg"
        style={{ width: '150px', height: '150px', paddingRight: '5%' }}
      />
    </>
  );
};

export default ReviewImgView;
