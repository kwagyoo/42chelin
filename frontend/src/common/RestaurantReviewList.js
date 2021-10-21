const ReviewListHeader = () => {
  return <>header</>;
};

const ReviewList = () => {
  return (
    <>
      <div>username</div>
      <div>date</div>
      <div>contents</div>
    </>
  );
};

const RestaurantReviewList = () => {
  return (
    <>
      <ReviewListHeader />
      <ReviewList />
    </>
  );
};

export default RestaurantReviewList;
