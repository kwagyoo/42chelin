import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Header from '../common/Header';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import AntModal from '../common/Modal';
import { Link } from 'react-router-dom';
import { writeReview } from '../lib/api/store';
import { getStoreInfoKakao } from '../lib/api/kakao';
import { uploadImagesToS3 } from '../lib/api/aws';
import querystring from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import TokenVerify from '../common/TokenVerify';

const Body = styled.div`
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
`;

const StyledForm = styled.form`
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
  const history = useHistory();

  const [store, setStore] = useState(null);
  const [files, setFiles] = useState([]); //업로드한 파일의 배열, 동시에 올린 파일끼리는 안에서 배열로 다시 묶여있다.
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

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
      return 200;
    } catch (e) {
      if (e.response.status < 500) {
        if (e.response.status === 403) {
          console.error('Token is expired.');
          await TokenVerify(sessionStorage.getItem('clusterName'));
        } else if (e.response.status === 401) {
          alert('기능을 사용할 권한이 없습니다. 이전 페이지로 이동합니다.');
        } else {
          alert('잘못된 요청입니다.');
        }
      } else alert('저장에 실패하였습니다.');
      return e.response.status;
    }
  };

  const handleSubmitBtn = async (data) => {
    let status = 200;
    if (!loading) {
      setLoading((loading) => !loading);
      setLoadingText('게시글 저장중..');
      if (store) {
        do {
          status = await sendReview({ ...data, images: files });
        } while (status !== 200 && status !== 403 && status !== 401);
      }
      setLoading((loading) => !loading);
    }
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
            category: res.category_group_code,
            x: res.x,
            y: res.y,
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
    setValue('storeCategory', store?.category);
    setValue('reviewDate', formatDate(Date.now()));
  }, [store, setValue]);

  return (
    <Body>
      <Header />
      <main>
        {loading && <AntModal visible="true" loadingText={loadingText} />}
        <StyledForm onSubmit={handleSubmit(handleSubmitBtn)}>
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
            <Button name="submit" disabled={loading}></Button>
            <Button
              name="cancel"
              disabled={loading}
              onClick={() => history.goBack()}
            ></Button>
          </div>
        </StyledForm>
      </main>
    </Body>
  );
};
export default ReviewWritePage;
