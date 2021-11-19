import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const StyledDrop = styled.div`
  display: inline-block;
  border-style: solid;
  border-width: 1px;
  width: 110px;
  height: 110px;
  .dropMsg {
    margin-top: 40px;
    width: 110px;

    text-align: center;
    font-size: 12px;
  }
`;

const ThumbsContainer = styled.div`
  overflow: auto;
  width: 100%;
  max-height: 110px;
  display: flex;
  margin: 5px 0px;
`;

const img = {
  width: '100px',
  height: '100px',
};

const Thumb = styled.div`
  display: inline-block,
  flex: 110px,
  borderRadius: 2,
  border: 1px solid #eaeaea,
  marginBottom: 8,
  marginRight: 8,
  width: 110,
  height: 110,
  padding: 4,
  boxSizing: border-box,
`;

const thumbInner = {
  width: '100%',
  height: '100%',
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const ImageUpload = ({ files, count, setFiles, setCount }) => {
  const uploadButton = useRef(null);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); //newArray가 배열이라서 이중 배열이 되기 때문에 flat으로 1차원배열로 변환
    setCount((prevCount) => prevCount + acceptedFiles.length);
  }; //files는 왜 의존 안해도 상관없는가... 값과 배열의 차이, usecallback 함수 재생성차이

  const onDelete = (name) => {
    const selectedFile = files.find((x) => {
      if (x.imageURL) return x.image === name;
      return x.name === name;
    });
    if (selectedFile?.preview) URL.revokeObjectURL(selectedFile.preview);
    setFiles((prevFiles) => prevFiles.filter((x) => x !== selectedFile)); //splice의 경우 원래 함수를 잘라주는 함수라서 새로 배열을 생성하지 않아 갱신하지 않는것일 듯
    setCount((prevCount) => prevCount - 1);
  };

  const thumbs = files.map(
    (
      file,
      index, //[[file],[file,file]...]와 같이 동시에 업로드한 파일들끼리 묶여있어서 이중 map을 사용해서 내부정보를 얻어온다.
    ) => (
      <Thumb id={file.name} key={index}>
        <div
          style={thumbInner}
          onClick={() => onDelete(file.name ?? file.image)}
        >
          <img
            src={file.imageURL ?? URL.createObjectURL(file)}
            style={img}
            alt="thumbnail"
          />
        </div>
      </Thumb>
    ),
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: true,
    accept: 'image/gif, image/jpg, image/jpeg, image/png',
  };

  useEffect(() => {
    if (count > 3) uploadButton.current.scrollIntoView();
  }, [count]);

  return (
    <>
      <ThumbsContainer count={count}>
        {thumbs}
        <StyledDrop {...getRootProps()} ref={uploadButton} maxSize={100}>
          <input {...InputProps} />
          {isDragActive ? (
            <p className="dropMsg">이제 이미지를 놓아주세요</p>
          ) : (
            <div
              style={{
                alignItems: 'center',
                height: '40%',
              }}
            >
              <div className="dropMsg">이미지 드랍/클릭</div>
            </div>
          )}
        </StyledDrop>
      </ThumbsContainer>
    </>
  );
};

export default ImageUpload;
