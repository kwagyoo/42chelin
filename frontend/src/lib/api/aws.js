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

export const deleteImageFromS3 = (images) => {};