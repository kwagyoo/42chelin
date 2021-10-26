import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import StoreInfo from '../common/StoreInfo';
import { SearchKakao } from '../lib/api/kakao';
import { getStoreList } from '../module/storeinfo';

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
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onClick = async () => {
    const searchText = text;
    try {
      const res = await SearchKakao(searchText);
      const data = res.data.body;
      console.log(res);
      dispatch(getStoreList(data));
      setText('');
    } catch (e) {
      console.log(e);
    }
  };
  const { searchstoreList } = useSelector((state) => state.storeinfo);
  console.log(searchstoreList);

  return (
    <>
      <SearchInput>
        <input
          type="text"
          placeholder="가게를 검색해주세요."
          onChange={onChange}
          value={text}
        />
        <button onClick={onClick}>send</button>
      </SearchInput>
      {searchstoreList.map((store, idx) => (
        <StoreInfo
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
