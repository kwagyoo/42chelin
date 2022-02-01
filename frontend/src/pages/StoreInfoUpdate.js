import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import SButton from '../common/Button';
import AntModal from '../common/Modal';
import { Link, useHistory } from 'react-router-dom';
import { updateStoreDetail } from '../lib/api/store';
import { getStoreInfoKakao } from '../lib/api/kakao';
import querystring from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, InputNumber, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Body = styled.div`
  background-color: #fafafa;
  width: 100vw;
  min-height: 100vh;
`;

const StyledForm = styled(Form)`
  margin: 10px auto 0px;
  width: 550px;
  padding: 0 10px 0 10px;
  @media (max-width: 550px) {
    margin-top: 10px;
    width: 100vw;
  }

  > * {
    margin-bottom: 10px;
  }

  .address_option {
    width: 100px;
    margin-right: 10px;
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

const StoreInfoUpdate = ({ location }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const history = useHistory();
  const menus = useSelector((state) => state.menus);
  const [fields] = useState({
    menus: [],
  });
  const [form] = Form.useForm();
  useEffect(() => {
    const menu = menus.menus?.map((item, idx) => {
      return { key: idx, menu: item.menu, price: item.price };
    });
    form.setFieldsValue({ menus: menu });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendReview = async (data) => {
    const menus = data.menus
      .map((item) => {
        return { menu: item.menu, price: item.price };
      })
      .filter(
        (menu, index, self) =>
          index === self.findIndex((t) => t.menu === menu.menu),
      );
    const combineData = {
      menus,
      storeID: store.id,
      storeAddress: store.address,
    };
    try {
      await updateStoreDetail({
        ...combineData,
      });
      history.push(`/detail?storeID=${store.id}&storeAddress=${store.address}`);
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

  const handleSubmitBtn = async (values) => {
    if (!loading) {
      setLoading((loading) => !loading);
      setLoadingText('게시글 저장중..');
      await sendReview({ ...values });
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
            address: res.road_address_name,
            id: res.id,
          });
        })
        .catch((err) => {
          alert('가게 정보를 가져올 수 없습니다.');
          console.error(err);
        });
    }
  }, [location]);

  return (
    <Body>
      <Header />
      <main>
        {loading && <AntModal visible="true" loadingText={loadingText} />}
        <StyledForm
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={handleSubmitBtn}
          initialValues={fields}
          form={form}
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
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <StyledForm.Item
                      name={[field.name, 'menu']}
                      rules={[{ required: true, message: 'Missing menu name' }]}
                    >
                      <Input placeholder="메뉴명" />
                    </StyledForm.Item>
                    <StyledForm.Item
                      name={[field.name, 'price']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <InputNumber placeholder="가격" type="number" />
                    </StyledForm.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <StyledForm.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    메뉴 추가
                  </Button>
                </StyledForm.Item>
              </>
            )}
          </StyledForm.List>
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

export default StoreInfoUpdate;
