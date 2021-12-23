import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Header from '../common/Header';
import SButton from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import AntModal from '../common/Modal';
import { Link, useHistory } from 'react-router-dom';
import { writeReview } from '../lib/api/store';
import { getStoreInfoKakao } from '../lib/api/kakao';
import { uploadImagesToS3 } from '../lib/api/aws';
import querystring from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Body = styled.div`
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
`;

const StyledForm = styled(Form)`
  margin: 10px auto 0px;
  width: 550px;
  padding: 0 10px 0 10px;
  font-family: 'Do Hyeon', sans-serif;
  @media (max-width: 550px) {
    margin-top: 10px;
    width: 100vw;
  }

  > * {
    margin-bottom: 10px;
  }
  textarea {
    vertical-align: top;
  }
  .address_option {
    width: 100px;
    margin-right: 10px;
  }
  .store_like_dislike input {
    display: none;
  }
  .store_like_dislike label {
    margin-left: 5px;
  }
  .store_like_dislike input {
    display: none;
  }
  input[type='radio']:checked + label img {
    border: 1px solid black;
  }
  .write_page_header {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .btn-group {
    display: block;
    text-align: center;
  }
`;

const TargetStoreSearch = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: solid;
  display: flex;
  justify-content: space-between;
  .target_store_info {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: ${(props) => (props.store ? 'column' : 'row')};
    align-items: ${(props) => (props.store ? 'space-between' : 'center')};
  }
  .target_store_info div {
    height: 40%;
  }
  .target_store_info div p {
    font-size: 20px;
  }
  .store_search_button {
    display: flex;
    align-items: center;
  }
`;

/* 글자수 제한 함수
   initialValue => textArea 초기 문자열
   validator => textArea의 문자열을 체크할 제한 함수
*/
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const value = event?.target?.value;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const ReviewWritePage = ({ location }) => {
  const [store, setStore] = useState(null);
  const [files, setFiles] = useState([]); //업로드한 파일의 배열, 동시에 올린 파일끼리는 안에서 배열로 다시 묶여있다.
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const history = useHistory();
  const { register, handleSubmit, setValue } = useForm();

  const review = useInput('', (value) => value.length < 300);

  const sendReview = async (data) => {
    try {
      const imageNames = uploadImagesToS3(data.images);
      await writeReview({
        ...data,
        images: imageNames,
      });
      history.push(
        `/detail?storeID=${data.storeID}&storeAddress=${data.storeAddress}`,
      );
    } catch (e) {
      if (e.response.status < 500) {
        if (e.response.status === 401) {
          alert('기능을 사용할 권한이 없습니다. 새로고침을 진행합니다.');
          history.go(0);
        } else {
          alert('잘못된 요청입니다.');
        }
      } else alert('서버에 문제가 발생하였습니다.');
    }
  };

  const handleSubmitBtn = async (data, values) => {
    const combineData = { ...data, menus: [...values.menus] };
    if (!loading) {
      setLoading((loading) => !loading);
      setLoadingText('게시글 저장중..');
      await sendReview({ ...combineData, images: files });
    }
    setLoading((loading) => !loading);
  };

  useEffect(() => {
    const query = querystring.parse(location.search);
    if (Object.keys(query).length !== 0) {
      getStoreInfoKakao(query)
        .then((res) => {
          setStore({
            placeName: res.place_name,
            address: res.road_address_name?.split(' ').slice(0, 2).join(' '),
            id: res.id,
            category_code: res.category_group_code,
            category_name: res.category_name,
            x: res.x,
            y: res.y,
            phoneNumber: res.phone,
          });
        })
        .catch((err) => {
          alert('가게 정보를 가져올 수 없습니다.');
          console.error(err);
        });
    }
  }, [location]);

  useEffect(() => {
    setValue('clusterName', sessionStorage.getItem('clusterName'));
    setValue('storeName', store?.placeName);
    setValue('storeAddress', store?.address);
    setValue('x', store?.x);
    setValue('y', store?.y);
    setValue('storeID', store?.id);
    setValue('storeCategory', store?.category_code);
    setValue('storeCategoryName', store?.category_name);
    setValue('reviewDate', formatDate(Date.now()));
    setValue('phoneNumber', store?.phoneNumber);
  }, [store, setValue]);

  return (
    <Body>
      <Header />
      <main>
        {loading && <AntModal visible="true" loadingText={loadingText} />}
        <StyledForm
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={handleSubmit(handleSubmitBtn)}
        >
          <div className="write_page_header">
            <h1>리뷰 작성</h1>
          </div>
          <TargetStoreSearch store={store}>
            <div className="target_store_info">
              {store ? (
                <>
                  <div className="target_store_name">
                    <p>{store?.placeName}</p>
                  </div>
                  <div className="target_store_address">
                    <p>{store?.address}</p>
                  </div>
                </>
              ) : (
                <div className="request_target_store">
                  <p>가게를 검색해주세요.</p>
                </div>
              )}
            </div>
            <div className="store_search_button">
              <Link to="/storeSearch">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: 'black' }}
                  size="lg"
                  className="search"
                />
              </Link>
            </div>
          </TargetStoreSearch>
          <StyledForm.List name="menus">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} align="baseline">
                    <StyledForm.Item
                      {...restField}
                      name={[name, 'menu']}
                      fieldKey={[fieldKey, 'menu']}
                    >
                      <Input placeholder="메뉴명" />
                    </StyledForm.Item>
                    <StyledForm.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
                    >
                      <Input placeholder="가격" />
                    </StyledForm.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <StyledForm.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </StyledForm.Item>
              </>
            )}
          </StyledForm.List>
          <div>
            리뷰(1000자 미만)
            <br />
            <textarea
              style={{ width: '100%', height: '200px' }}
              {...register('reviewText')}
              value={review.value}
              maxLength={1000}
              onChange={review.onChange}
              required
            />
          </div>
          <div>
            <ImageUpload
              files={files}
              count={count}
              setFiles={setFiles}
              setCount={setCount}
            />
          </div>
          <div className="btn-group">
            <SButton name="submit" disabled={loading}></SButton>
            <SButton
              name="cancel"
              disabled={loading}
              onClick={() => history.push('/')}
            ></SButton>
          </div>
        </StyledForm>
      </main>
    </Body>
  );
};

export default ReviewWritePage;
