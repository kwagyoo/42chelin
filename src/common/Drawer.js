import { Divider, Drawer, Space, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StoreBlock from '../block/StoreBlock';
import { updatePassword } from '../lib/api/auth';
import PasswordModal from './PasswordModal';
import qs from 'qs';
import { loadImageFromS3 } from '../lib/api/aws';
import SkeletonDiv from './Skeleton';

const StyledContent = styled(Content)`
  width: 330px;
  padding: 10px;
  text-align: center;
  background: #f3f3f380;
`;

const StyledButton = styled.button`
  border: none;
  background-color: white;
  :hover {
    color: gray;
    cursor: pointer;
  }
`;

const StyledSpace = styled(Space)`
  text-align: center;
`;

const StyledInfo = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
  border-bottom: 1px solid #bcbcbc;
  padding: 0 20px 0 0;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    background-color: gainsboro;
  }
`;

const StyledTabs = styled(Tabs)`
  min-width: 250px;
  .ant-space {
    display: flex;
    flex-direction: row;
    .ant-space-vertical {
      flex-direction: column;
    }
  }
`;

const DrawerDiv = ({ onClose, visible, name, onLogout, favoriteStore }) => {
  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visited, setVisited] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChange = async (values) => {
    const data = {
      currPassword: values.currPassword,
      prevPassword: values.prevPassword,
      clusterName: sessionStorage.getItem('clusterName'),
    };
    try {
      await updatePassword(data);
      alert('비밀번호 변경을 성공했습니다.');
      setIsModalVisible(false);
    } catch {
      alert('비밀번호 변경을 실패했습니다.');
    }
  };

  useEffect(() => {
    const checkThumbExpires = async () => {
      const visitedStores = JSON.parse(localStorage.getItem('visited'));
      if (!visitedStores) return;
      const updateVisited = await Promise.all(
        visitedStores?.map(async (store) => {
          if (!store.storeImageURL) return store;
          const query = qs.parse(store.storeImageURL, {
            ignoreQueryPrefix: true,
          });
          const date = query['X-Amz-Date']
            .split('')
            .filter((x) => x.match(/\d/))
            .join('');
          const today = new Date()
            .toISOString()
            .split('.')[0]
            .replace(/[^\d]/gi, '');
          if (today > date) {
            const newImageURL = await loadImageFromS3(store.storeImage);
            return { ...store, storeImageURL: newImageURL };
          }
          return store;
        }),
      );
      setVisited(updateVisited);
    };
    checkThumbExpires();
    return () => {};
  }, [visible]);

  return (
    <>
      <Drawer
        title="내정보"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <PasswordModal
          visible={isModalVisible}
          onChange={onChange}
          onCancel={() => {
            setIsModalVisible(false);
          }}
        />
        <StyledSpace direction="vertical">
          <StyledContent>
            <div>클러스터 ID : {name}</div>
          </StyledContent>
          <StyledSpace>
            <StyledButton onClick={onLogout}>로그아웃</StyledButton>
            <Divider type="vertical" />
            <StyledButton onClick={showModal}>비밀번호 변경</StyledButton>
          </StyledSpace>
          <Divider />
          <StyledSpace>
            <StyledTabs centered>
              <TabPane tab="좋아요 한 가게" key="1">
                {favoriteStore ? (
                  favoriteStore.map((store, idx) => {
                    return (
                      <StyledInfo key={idx}>
                        <StoreBlock store={store} />{' '}
                      </StyledInfo>
                    );
                  })
                ) : (
                  <SkeletonDiv />
                )}
              </TabPane>
              <TabPane className="hello" tab="최근 본 맛집" key="2">
                <div style={{ textAlign: 'right' }}>
                  <StyledButton
                    style={{ color: 'gray', fontSize: '11px' }}
                    onClick={() => {
                      localStorage.clear();
                      setVisited([]);
                    }}
                  >
                    clearAll
                  </StyledButton>
                </div>
                {visited?.map((store, idx) => {
                  return (
                    <StyledInfo key={idx}>
                      <StoreBlock store={store} />
                    </StyledInfo>
                  );
                })}
              </TabPane>
            </StyledTabs>
          </StyledSpace>
        </StyledSpace>
      </Drawer>
    </>
  );
};

export default DrawerDiv;
