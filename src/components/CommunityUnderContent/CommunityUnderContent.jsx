import React, { useEffect } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import {
  UnderContentContainer,
  ContentInfo,
  ContentButton,
  BTN,
} from './CommunityUnderContent.styles';

const CommunityUnderContent = ({ selectedPost, onEdit, onDelete, post }) => {
  const handleEditClick = () => {
    // 수정 모달을 띄우거나 수정폼을 보여줄 수 있는 작업
    onEdit(post);
  };

  const handleDeleteClick = () => {
    // 삭제 확인 모달을 띄우고 사용자가 확인하면 삭제 진행
    onDelete(post._id);
  };

  return (
    <UnderContentContainer>
      <ContentInfo>
        <div>
          {post?.board?.user_id.img ? (
            <img src={post?.board?.user_id.img} alt="UserImg" />
          ) : (
            <FaCircleUser size={'25px'} color="gray" />
          )}
        </div>
        <div>
          <p>{post?.board?.user_id?.nickname}</p>
          <p>{post?.board?.createdAt}</p>
        </div>
      </ContentInfo>
      <ContentButton>
        <BTN onClick={handleEditClick}>수정</BTN>
        <BTN onClick={handleDeleteClick}>삭제</BTN>
      </ContentButton>
    </UnderContentContainer>
  );
};

export default CommunityUnderContent;