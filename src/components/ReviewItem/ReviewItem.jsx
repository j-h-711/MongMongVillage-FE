import { useNavigate } from 'react-router-dom';
import {
  Container,
  RightContainer,
  ReviewTitle,
  PreviewImg,
  ReviewDate,
  StarRating,
  CafeName,
  PreviewImgContainer,
  Content,
  Writer,
  BottomContainer,
  MainContainer,
} from './styles';
import { ROUTE } from '../../routes/Routes';

const ReviewItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <CafeName onClick={() => alert('cafe name')}>
        [{'여기에 카페이름'}]
      </CafeName>
      <MainContainer
        onClick={() => navigate(ROUTE.REVIEW_DETAIL_PAGE.link + `/${item._id}`)}
      >
        <RightContainer>
          <ReviewTitle>{item.title}</ReviewTitle>
          <Content>{item.content}</Content>
          <BottomContainer>
            <Writer>
              {item.userImg ? (
                <img alt="유저프로필이미지" src={item.userImg} />
              ) : (
                <img
                  src={`${`${process.env.PUBLIC_URL}/imges/user.png`}`}
                  alt="user_img"
                />
              )}
              <span>username</span>
            </Writer>
            <ReviewDate>
              {new Date(item.createdAt).toLocaleString() + ' 작성'}
            </ReviewDate>
            <StarRating>
              <span className="ratingStar">
                {'★'.repeat(item.rating) + '☆'.repeat(5 - item.rating)}
              </span>
              <span className="ratingValue">{`(${item.rating})`}</span>
            </StarRating>
          </BottomContainer>
        </RightContainer>
        <PreviewImgContainer>
          {item.images.length > 0 &&
            item.images
              .slice(0, 3)
              .map((img, idx) => (
                <PreviewImg src={img} key={item._id + 'img' + idx} />
              ))}
        </PreviewImgContainer>
      </MainContainer>
    </Container>
  );
};

export default ReviewItem;