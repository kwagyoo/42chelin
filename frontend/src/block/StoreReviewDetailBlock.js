import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMenu } from '../module/posts';

const StoreItemBlock = styled.div`
  width: 100%;
  padding-top: 2rem;
`;
const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #969696;
  button {
    border: none;
    background-color: white;
    :hover {
      color: gray;
      cursor: pointer;
    }
  }
  .btn-like {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fafafa;
    .like-num {
      display: flex;
      justify-contents: center;
      margin-left: 5px;
      font-size: 1rem;
    }
  }
  .store-header-title {
    display: flex;
    align-items: center;
  }
  .btn-review-detail {
    font-size: 1rem;
    background-color: #fafafa;
  }
  h2,
  p {
    display: block;
    margin: 0;
  }
`;

const StyledTable = styled.table`
  padding: 10px 0;
  display: block;
  border-bottom: 1px solid #969696;
  .menu-list-li {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
  th {
    /* margin-bottom: 10px; */
  }
  td {
    padding-left: 5px;
  }
  ul {
    margin-top: 15px;
    padding-left: 0px;
    width: 100%;
    list-style: none;
  }
  li {
    border-bottom: dashed 1px black;
  }
  span {
    /* text-align: left; */
  }
`;

const StoreReviewDetail = ({
  storeList,
  ToggleLike,
  isLike,
  likeButtonDisable,
}) => {
  const clusterName = sessionStorage.getItem('clusterName');
  const history = useHistory();
  const dispatch = useDispatch();

  const goUpdatePage = () => {
    dispatch(setMenu(storeList.storeMenus));
    history.push(
      `/storeupdate?placeName=${storeList.storeName}&id=${storeList.storeID}`,
    );
  };

  return (
    <StoreItemBlock>
      <StoreHeader>
        <div className="store-header-title">
          <div className="store-name">
            <h2>{storeList.storeName}</h2>
          </div>
          {clusterName ? (
            <button
              onClick={ToggleLike}
              disabled={likeButtonDisable}
              className="btn-like"
            >
              {isLike ? (
                <FontAwesomeIcon icon={fasFaHeart} size="lg" color="#c0c0c0" />
              ) : (
                <FontAwesomeIcon icon={farFaHeart} size="lg" color="#808080" />
              )}
              <div className="like-num">
                <p>{storeList.storeLikes}</p>
              </div>
            </button>
          ) : (
            <button className="btn-like">
              <div className="like-num">{storeList.storeLikes}</div>
              <FontAwesomeIcon icon={farFaHeart} size="lg" color="#808080" />
            </button>
          )}
        </div>
        <button className="btn-review-detail" onClick={goUpdatePage}>
          가게정보 수정
        </button>
      </StoreHeader>
      {/* display block을 하면 table이 가로 전체를 차지하게 된다. */}
      <StyledTable>
        <tbody>
          <tr>
            <th>주소</th>
            <td>{storeList.storeAddress}</td>
          </tr>
          <tr>
            <th>분류</th>
            <td>
              <div>{storeList.storeCategoryName ?? '정보 없음'}</div>
            </td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>
              {storeList.storePhoneNumber ? (
                <a href={storeList.storePhoneNumber}>
                  {storeList.storePhoneNumber}
                </a>
              ) : (
                <div>정보 없음</div>
              )}
            </td>
          </tr>
          <tr>
            <th>메뉴</th>
            <td>
              <ul>
                {storeList.storeMenus.length > 0 ? (
                  storeList.storeMenus.map((menu, idx) => {
                    return (
                      <li key={idx} className="menu-list-li">
                        <div>김밥</div>
                        <div>3000원</div>
                      </li>
                    );
                  })
                ) : (
                  <p>정보 없음</p>
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </StoreItemBlock>
  );
};

export default StoreReviewDetail;
