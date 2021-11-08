import styled from 'styled-components';
import AWS from 'aws-sdk';
import { useState } from 'react';

const Styledimg = styled.div`
  .image-upload {
    width: 120px !important;
    height: 120px !important;
    font-size: 100px;
    text-align: right;
    min-width: 0 !important;
    outline: none;
    background: rgb(0, 0, 0);
    cursor: inherit;
    display: block !important;
    border-radius: 50% !important;
    cursor: pointer;
    position: absolute;
    margin: 0 !important;
    z-index: -1;
  }

  .image-upload-wrapper {
    position: inherit;
    width: 120px !important;
    height: 120px !important;
    font-size: 100px;
    text-align: right;
    min-width: 0 !important;
    outline: none;
    background: rgb(255, 255, 255);
    cursor: inherit;
    display: block !important;
    border-radius: 50% !important;
    cursor: pointer;
  }
`;

const ImgUpload = () => {
  const [listFiles, setListFiles] = useState([]);
  const [test, setTest] = useState('');

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:9449a853-9bf7-437d-8205-a66cfc556ecd', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const s3 = new AWS.S3();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: '42chelin/img',
        Key: `${fileName}`,
        Body: file,
      },
    });
    console.log(upload);
    const promise = upload.promise();
    console.log(promise);
    promise.then(
      function (data) {
        alert('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert('오류가 발생했습니다: ', err.message);
      },
    );
  };

  const onClick = () => {
    const params = {
      Bucket: '42chelin',
      Delimiter: '/',
      Prefix: 'img/',
    };
    const list = s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const d = data.Contents.filter((file) => file.Size > 0);
        console.log(d);
        setListFiles(d);
      }
    });
    console.log(list);
  };

  const onClick2 = () => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: '42chelin',
        Key: 'img/images.jpg', // ex) assets/
      },
      (err, url) => {
        if (err) {
          throw err;
        }
        console.log(url);
        setTest(url);
      },
    );
  };

  return (
    <Styledimg>
      <input
        type="file"
        id="upload"
        className="image-upload"
        onChange={handleFileInput}
      />
      <label htmlFor="upload" className="image-upload-wrapper"></label>
      <button onClick={onClick}>test</button>
      <button onClick={onClick2}>test2</button>

      <div className="card">
        <div className="card-header">SampleCompany Files</div>
        <img src={`${test}`} alt="5" />
        <ul className="list-group">
          {listFiles &&
            listFiles.map((name, index) => (
              <li className="list-group-item" key={index}>
                {name.Key}
                <img
                  src={`https://42chelin.s3.ap-northeast-2.amazonaws.com/${name.Key}`}
                  alt="tmp"
                />
              </li>
            ))}
        </ul>
      </div>
    </Styledimg>
  );
};

export default ImgUpload;
