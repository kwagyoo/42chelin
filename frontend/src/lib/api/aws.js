import AWS from 'aws-sdk';
import loadImage from 'blueimp-load-image';

export const uploadImagesToS3 = async (images, path) => {
  const imageNames = await Promise.all(
    images.map(async (image) => {
      const imageName =
        path.storeID +
        '/' +
        Math.random().toString(36).substr(2, 15) +
        image.name.slice(image.name.lastIndexOf('.'));
      loadImage(
        image,
        function (event, data) {
          console.log(event, data);
        },
        { meta: true, canvas: true, orientation: true },
      );
      //   .then((data) => {
      //     console.log('data', data, data.exif);
      //     if (data.imageHead && data.exif) {
      //       loadImage.writeExifData(data.imageHead, data, 'Orientation', 1);
      //     }
      //   });
      return imageName;
    }),
  );
  return imageNames;
};

//   const upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: '42chelin-images/original',
//       Key: imageName,
//       Body: loadedImg.blob,
//     },
//   });
//   upload.send();

export const loadImageFromS3 = async (image) => {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: '42chelin-images',
      Key: `w_500/${image}`, // ex) assets/
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
      Key: `w_500/${image}`, // ex) assets/
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
