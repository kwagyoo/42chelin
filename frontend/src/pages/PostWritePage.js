import React,{useEffect, useState, useCallback} from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import {useDropzone} from 'react-dropzone';

const StyledForm = styled.form`
  margin-left : 10px;
  > * {
    margin-bottom: 10px;
  }
  textarea{
    vertical-align:top;
  }
`;

const StyledDrop = styled.div`
  border-style : solid;
  border-width : 1px;
  width : 80%;
  height : 150px;
  .dropMsg {
    margin-top : 63px;
    text-align : center;
  }
`;

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const PostWritePage = () => {
  const [date, setDate]= useState(null);
  const [files, setFiles] = useState([]); //업로드한 파일의 배열, 동시에 올린 파일끼리는 안에서 배열로 다시 묶여있다.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  }

  const onDrop = useCallback(acceptedFiles => {
    const newArray = acceptedFiles.map((file, index) => //이 과정을 통해서 각 file객체 속성으로 썸네일 경로가 생성된다. 위에 콘솔을 입력해도 이 과정이 더 빠른건지 preview속성이 나온다.
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
    setFiles(prevFiles => [...prevFiles, newArray].flat()); //newArray가 배열이라서 이중 배열이 되기 때문에 flat으로 1차원배열로 변환
  },[files])

  const onDelete = (index) => {
	const array = files;
	URL.revokeObjectURL(array.splice(index, 1)[0].preview);
	console.log(files, array)
    setFiles(array);
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/gif, image/jpg, image/jpeg",
  };

  const thumbs = files.map((file,index) => ( //[[file],[file,file]...]와 같이 동시에 업로드한 파일들끼리 묶여있어서 이중 map을 사용해서 내부정보를 얻어온다.
    <div style={thumb} id={file.name} key={index}>
      <div style={thumbInner} onClick={()=>onDelete(index)}>
        <img src={file.preview} style={img} alt="thumbnail" />
      </div>
    </div>
  ));

  useEffect(()=>{
    const date = new Date();
    setDate(getFormatDate(date)); 
  },[date]);

  useEffect(() => {
	console.log(files);
  }, [files])

  return (
    <React.Fragment>
      <Header />
      <StyledForm>
        <div>
          이름 : <input type="text" required></input>
        </div>
        <div>
          주소 : <input type="text" required></input>
        </div>
        <div>
          등록일 : <input type="date" placeholder="yyyy-mm-dd" defaultValue={date} disabled></input>
        </div>
        <div>
          리뷰
          <br />
          <textarea style={{ width: '80%', height: '200px' }} required/>
        </div>
        <StyledDrop {...getRootProps()} maxSize={100} multiple={false}>
          <input {...InputProps} />
            {isDragActive ? (
              <p class="dropMsg">이제 이미지를 놓아주세요</p>
            ) : (
              <div
                style={{
                  alignItems: "center",
                  height : "90%"
                }}
              >
                <div style={{ fontSize: "3em", marginBottom: "5px" }}>
                  <i className="fas fa-file-upload"></i>
                </div>
                <div class="dropMsg">이미지 드랍 or 클릭</div>
              </div>
            )}
          </StyledDrop>
          <div style={thumbsContainer}>{thumbs}</div>
        <Button name="submit"></Button>
      </StyledForm>
    </React.Fragment>
  );
};
export default PostWritePage;
