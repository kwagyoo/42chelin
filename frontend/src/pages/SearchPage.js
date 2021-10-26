import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import StoreInfo from '../common/StoreInfo';
import { SearchKakao } from '../lib/api/kakao';

const SearchInput = styled.div`
  position: relative;
  overflow: hidden;
  height: 58px;
  display: block;
  background-color: #ffffff;
  border-bottom: 1px solid;
  input {
    margin-left: 30px;
    margin-top: 5px;
    height: 40px;
    width: 550px;
    border-style: none;
  }
`;

const SearchPage = () => {
  const history = useHistory();
  const [text, setText] = useState('');
  const [searchstoreList, setSearchstoreList] = useState([]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const SearchStoreEvent = async () => {
    const searchText = text;
    try {
      const res = await SearchKakao(searchText);
      const data = res.data.body;
      console.log(res);
      setSearchstoreList(data);
      setText('');
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
      <SearchInput>
        <input
          type="text"
          placeholder="가게를 검색해주세요."
          onChange={onChange}
          value={text}
        />
        <button onClick={SearchStoreEvent}>send</button>
      </SearchInput>
      {searchstoreList.map((store, idx) => (
        <StoreInfo
          onClick={() => SubmitStoreData(store.place_name, store.id)}
          address={store.address_name}
          placeName={store.place_name}
          categoryName={store.category_name}
          key={idx}
        />
      ))}
    </>
  );
};

export default SearchPage;
