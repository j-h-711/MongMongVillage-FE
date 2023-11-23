import React, { useState, useEffect } from 'react';
import { useGetBoards, useGetDetailBoards } from '../../hooks';
import {
  CommunityList,
  CommunityPost,
  CommunityPostLike,
  CommunityUnderContent,
  CommunityComments,
  CommunityPagination,
} from '../../components/index.js';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container } from './CommunityDetailPage.styles.js';
import { ROUTE } from '../../routes/Routes.js';

const CommunityDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ITEMS_PER_PAGE = 4;
  // 현재 페이지 상태
  const { state } = location;
  const stateList = state ? state.list : [];

  // 현재 페이지의 전체 게시글
  const [list, setList] = useState(stateList);
  // 디테일 페이지의 해당 게시글
  const [post, setPost] = useState();
  const [totalBoards, setTotalBoards] = useState(0);

  // 카테고리 filtered state
  const filteredCategory = state ? state.filteredCategory : null;
  const getPage = state ? state.currentPage : 1;
  const [currentPage, setCurrentPage] = useState(getPage);

  // params를 통해 id 값만 가져옴
  const { id } = useParams();

  // 서버로부터 해당 작성글 받아오도록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const { mutate: mutatePost, data: postData } = useGetDetailBoards(id);

  useEffect(() => {
    mutatePost();
  }, [id, mutatePost]);

  useEffect(() => {
    if (postData) {
      setPost(postData);
    }
  }, [postData, id]);

  // 서버로부터 list 받아옴 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const { mutate: mutateBoards, data: boardsData } = useGetBoards(
    currentPage,
    filteredCategory,
  );

  useEffect(() => {
    mutateBoards();
  }, [currentPage, filteredCategory, mutateBoards]);

  useEffect(() => {
    if (boardsData && boardsData.boards) {
      setList(boardsData.boards);
      setTotalBoards(boardsData.total_number_of_boards);
    }
  }, [boardsData, currentPage, filteredCategory]);

  // 해당 게시글 정보 저장 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const [selectedPost, setSelectedPost] = useState(
    list.find((post) => post._id === id),
  );
  // id 값을 params로 넘겨줄 함수 - detail 페이지로 정보 넘겨주기
  const handlePostClick = (id) => {
    setSelectedPost(list.find((post) => post._id === id));
    navigate(`${ROUTE.COMMUNITY_DETAIL_PAGE.link}/${id}`, {
      state: { list: list, filteredCategory: filteredCategory, board: post },
    });
    // navigate(`/community/${id}`);
    window.scrollTo(0, 0);
  };

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 좋아요 눌렸는지 확인 state
  const [likeclick, setlikeclick] = useState(false);
  // 좋아요 눌렀을 때 실행되는 함수
  const handleLikeclick = (id) => {
    const updatePost = selectedPost;

    if (likeclick === false) {
      // 해당 게시글의 좋아요 + 1
      updatePost.like_count = selectedPost.like_count + 1;
      setlikeclick(true);
      // 여기서 api 를 통해 내가 누른 좋아요 목록에 글을 추가해줘야 함
    } else {
      // 해당 게시글의 좋아요 - 1
      updatePost.like_count = selectedPost.like_count - 1;
      setlikeclick(false);
    }

    setSelectedPost(updatePost);
  };

  // 페이지네이션 관련 기능 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 현재 페이지에 표시될 아이템들
  const totalPages = Math.ceil(totalBoards / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // 현재 페이지에 표시될 아이템들
  const currentPageItems = list;
  // 전체 페이지 수 계산

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  // 해당 페이지로 설정 함수
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // 게시글 수정 함수
  const handleEdit = (post) => {
    navigate(`${ROUTE.EDIT_POST_PAGE.link}/${post.board._id}`, {
      state: { post: post },
    });
    window.scrollTo(0, 0);
  };

  // 게시글 삭제 함수
  const handleDelete = () => {
    // 삭제 관련 작업 수행
    alert('게시글이 삭제되었습니다.');
    navigate(ROUTE.COMMUNITY_PAGE.link);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      {selectedPost && (
        <>
          <CommunityPost post={post} selectedPost={selectedPost} />
          <CommunityPostLike
            like={selectedPost.like_count}
            likeclick={likeclick}
            onClick={handleLikeclick}
          ></CommunityPostLike>
          <CommunityUnderContent
            /* 수정, 삭제 함수 만들어 props로 넘겨주고 기능 구현 필요*/
            selectedPost={selectedPost}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          ></CommunityUnderContent>
          <CommunityComments
            selectedPost={selectedPost}
            post={post}
          ></CommunityComments>
        </>
      )}
      <CommunityList
        currentPageItems={currentPageItems}
        handlePostClick={handlePostClick}
      ></CommunityList>

      <CommunityPagination
        currentPage={currentPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        currentPageItems={currentPageItems}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        goToPage={goToPage}
      ></CommunityPagination>
    </Container>
  );
};

export default CommunityDetailPage;