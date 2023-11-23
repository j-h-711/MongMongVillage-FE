import { instance } from '.';
import { useMutation } from 'react-query';

const getBoards = async (currentPage, filteredCategory) => {
  try {
    let url = '/boards';
    // console.log('currentPage : ', currentPage);
    // console.log('filteredCategory : ', filteredCategory);

    // category가 주어진 경우 카테고리에 따라 경로를 설정
    if (filteredCategory === 'all') {
      url += `?currentPage=${currentPage}`;
    } else {
      url += `/category/${filteredCategory}?currentPage=${currentPage}`;
    }

    const response = await instance.get(url);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch Boards: ${error.message}`);
  }
};

export function useGetBoards(currentPage, filteredCategory) {
  return useMutation(() => getBoards(currentPage, filteredCategory), {
    onSuccess: (data) => {
      console.log('Boards fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch Boards:', error.message);
    },
  });
}
