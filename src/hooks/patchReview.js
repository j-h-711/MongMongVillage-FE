import { instance } from '.';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { ROUTE } from '../routes/Routes';

const patchReview = async (id, title, content, rating, images) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });
  formData.append('title', title);
  formData.append('content', content);
  formData.append('rating', rating);

  const response = await instance.patch(`/reviews/${id}`, formData, {});

  return response;
};

export function usePatchReview(id, title, content, rating, images) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(() => patchReview(id, title, content, rating, images), {
    onSuccess: () => {
      alert('리뷰가 수정되었습니다.');
    },

    onError: (error) => {
      console.error(error);
      alert(error.response.data.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['getReviews', 'getReview' + id]);
      navigate(ROUTE.REVIEW_LIST_PAGE.link);
    },
  });
}