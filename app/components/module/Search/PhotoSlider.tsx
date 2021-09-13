import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';

const PhotoSliderContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  top: 10%;
  height: 600px;
  width: 530px;
  &&& {
    div {
      height: 100%;
      width: 100%;
    }
    img {
      vertical-align: middle;
      object-fit: cover;
      width: 100%;
      height: 100%;
      max-height: fit-content;
    }
  }
`;

// const Slider = styled.div`
const Slider = styled(ImageGallery)`
  height: 600px;
  width: 530px;
`;

const StlContainer = styled(Container)`
  position: absolute;
  height: 100%;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
`;

const images = [
  {
    original: '/images/category-box-01.jpg',
    // thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: '/images/category-box-02.jpg',
    // thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: '/images/category-box-03.jpg',
    // thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export default function PhotoSlider() {
  return (
    <StlContainer>
      <PhotoSliderContainer>
        <Slider
          items={images}
          showPlayButton={false}
          showThumbnails={false}
          showFullscreenButton={false}
        />
      </PhotoSliderContainer>
    </StlContainer>
  );
}
