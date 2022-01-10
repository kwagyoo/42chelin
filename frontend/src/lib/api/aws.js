import AWS from 'aws-sdk';

export const uploadImagesToS3 = (images, path) => {
  const imageNames = images.map((image) => {
    const imageName =
      path.storeID +
      '/' +
      Math.random().toString(36).substr(2, 15) +
      image.name.slice(image.name.lastIndexOf('.'));
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: '42chelin-images/original',
        Key: imageName,
        Body: image,
      },
    });
    upload.send();
    return imageName;
  });
  return imageNames;
};

export const loadImageFromS3 = async (image) => {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: '42chelin-images',
      Key: `w_300/${image}`, // ex) assets/
      Expires: 3600 * 12,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loadThumbnailFromS3 = async (image) => {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: '42chelin-images',
      Key: `w_300/${image}`, // ex) assets/
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
