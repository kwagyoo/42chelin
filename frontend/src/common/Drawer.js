import { Divider, Drawer, Space, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import StoreBlock from '../block/StoreBlock';

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
  padding: 0 20px;
  overflow: hidden;
`;

const StyledTabs = styled(Tabs)``;

const DrawerDiv = ({ onClose, visible, name, onLogout }) => {
  const { TabPane } = Tabs;
  const visited = JSON.parse(localStorage.getItem('visited'));

  return (
    <>
      <Drawer
        title="내정보"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <StyledSpace direction="vertical">
          <StyledContent>
            <div>클러스터 ID : {name}</div>
          </StyledContent>
          <StyledSpace>
            <StyledButton onClick={onLogout}>로그아웃</StyledButton>
            <Divider type="vertical" />
            <StyledButton>비밀번호 변경</StyledButton>
          </StyledSpace>
          <Divider />
          <StyledSpace>
            <StyledTabs centered>
              <TabPane tab="좋아요 한 가게" key="1"></TabPane>
              <TabPane tab="최근 본 맛집" key="2">
                {visited.map((store, idx) => {
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
