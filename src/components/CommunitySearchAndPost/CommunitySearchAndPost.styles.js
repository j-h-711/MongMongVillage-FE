import styled from 'styled-components';

export const SearchAndPostContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex: 24;
  align-items: center;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

export const SearchInputBox = styled.div`
  display: flex;
  height: 40px;
  border: 2px solid var(--main-yellow-color);
  border-radius: 40px;
  align-items: center;
  width: 600px;
  margin-left: 60px;
`;
export const PostBTN = styled.button`
  height: 44px;
  flex: 1;
  border: 1px solid lightgrey;
  background-color: var(--main-yellow-color);
  border-radius: 8px;
`;

export const SearchButton = styled.button`
  margin-top: 4px;
  margin-left: 20px;
  background: none;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  padding: 8px;
  margin-top: 0px !important;
  border: none;
  margin-left: 4px;
  height: 24px;
  width: 500px;
`;