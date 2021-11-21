import AWS from 'aws-sdk';

export const uploadImagesToS3 = (images) => {
  try {
    const imageNames = images.map((image) => {
      const imageName =
        Math.random().toString(36).substr(2, 15) +
        image.name.slice(image.name.lastIndexOf('.'));
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: '42chelin/img',
          Key: imageName,
          Body: image,
        },
      });
      upload.send();
      return imageName;
    });
    return imageNames;
  } catch (err) {
    console.error(err);
  }
};

export const loadImageFromS3 = async (image) => {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: '42chelin',
      Key: `img/${image}`, // ex) assets/
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
