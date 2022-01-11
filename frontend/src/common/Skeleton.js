import { Skeleton } from 'antd';

const SkeletonDiv = () => {
  return (
    <>
      <Skeleton.Image style={{ width: 300, height: 200 }} />
      <br />
      <br />
      <Skeleton.Input style={{ width: 200 }} active size="small" />
      <br />
      <br />
      <Skeleton.Input style={{ width: 200 }} active size="small" />
    </>
  );
};

export default SkeletonDiv;
