import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import StoreInfo from '../common/StoreInfo';
import { SearchKakao } from '../lib/api/kakao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = styled.div`
  position: relative;
  overflow: hidden;
  height: 58px;
  display: block;
  border-bottom: 1px solid #bcbcbc;
  justify-content: space-between;

  input {
    margin-left: 30px;
    margin-top: 5px;
    height: 40px;
    width: 80%;
    border-style: none;
  }
  input:focus {
    outline: none;
  }

  .FontAwesomeIcon {
    justify-content: space-between;
  }
`;

const StoreInfoWarp = styled.div`
  margin-bottom: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  display: block;
`;

const SearchPage = () => {
  const history = useHistory();
  const [text, setText] = useState('');
  const [searchstoreList, setSearchstoreList] = useState([]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      SearchStoreEvent();
    }
  };

  const SearchStoreEvent = async () => {
    const searchText = text;
    try {
      const res = await SearchKakao(searchText);
      const data = res.data.body;
      setSearchstoreList(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const SubmitStoreData = (placeName, id) => {
    history.push({
      pathname: '/write',
      search: `?placeName=${placeName}&id=${id}`,
    });
  };
  // Todo : onchange 될때마다 계속 실행됌 아마 컴포넌트의 업데이트를 감지해서 그런듯??

  return (
    <>
      <SearchInput onKeyPress={onKeyPress}>
        <input
          type="text"
          placeholder="가게를 검색해주세요."
          onChange={onChange}
          value={text}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: 'black' }}
          size="lg"
          className="search"
          onClick={SearchStoreEvent}
        />
      </SearchInput>
      <StoreInfoWarp>
        {searchstoreList &&
          searchstoreList.map((store, idx) => (
            <StoreInfo
              onClick={() => SubmitStoreData(store.place_name, store.id)}
              address={store.address_name}
              placeName={store.place_name}
              categoryName={store.category_name}
              key={idx}
            />
          ))}
      </StoreInfoWarp>
    </>
  );
};

export default SearchPage;
