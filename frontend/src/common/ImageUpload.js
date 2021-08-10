import react from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const StyledDrop = styled.div`
  border-style: solid;
  border-width: 1px;
  width: 80%;
  height: 100px;
  .dropMsg {
    margin-top: 40px;
    text-align: center;
  }
`;

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const ImageUpload = ({ files, count, setFiles, setCount }) => {
  const onDrop = (acceptedFiles) => {
    const newArray = acceptedFiles.map(
      (
        file,
        index, //이 과정을 통해서 각 file객체 속성으로 썸네일 경로가 생성된다. 위에 콘솔을 입력해도 이 과정이 더 빠른건지 preview속성이 나온다.
      ) =>
        Object.assign(file, {
          index: count + index,
          preview: URL.createObjectURL(file),
        }),
    );
    setFiles((prevFiles) => [...prevFiles, newArray].flat()); //newArray가 배열이라서 이중 배열이 되기 때문에 flat으로 1차원배열로 변환
    setCount((prevCount) => prevCount + acceptedFiles.length);
  }; //files는 왜 의존 안해도 상관없는가... 값과 배열의 차이, usecallback 함수 재생성차이

  const onDelete = (index) => {
    URL.revokeObjectURL(files.find((x) => x.index === index).preview);
    setFiles((prevFiles) => prevFiles.filter((x) => x.index !== index)); //splice의 경우 원래 함수를 잘라주는 함수라서 새로 배열을 생성하지 않아 갱신하지 않는것일 듯
  };

  const thumbs = files.map(
    (
      file,
      index, //[[file],[file,file]...]와 같이 동시에 업로드한 파일들끼리 묶여있어서 이중 map을 사용해서 내부정보를 얻어온다.
    ) => (
      <div style={thumb} id={file.name} key={index}>
        <div style={thumbInner} onClick={() => onDelete(file.index)}>
          <img src={file.preview} style={img} alt="thumbnail" />
        </div>
      </div>
    ),
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: 'image/gif, image/jpg, image/jpeg',
  };

  return (
    <>
      <StyledDrop {...getRootProps()} maxSize={100} multiple={false}>
        <input {...InputProps} />
        {isDragActive ? (
          <p class="dropMsg">이제 이미지를 놓아주세요</p>
        ) : (
          <div
            style={{
              alignItems: 'center',
              height: '90%',
            }}
          >
            <div style={{ fontSize: '3em', marginBottom: '5px' }}>
              <i className="fas fa-file-upload"></i>
            </div>
            <div class="dropMsg">이미지 드랍 or 클릭</div>
          </div>
        )}
      </StyledDrop>
      <div style={thumbsContainer}>{thumbs}</div>
    </>
  );
};

export default ImageUpload;
