import { styled } from '@mui/material/styles';
import { EmotionHelper } from 'app/common/lib/emotion';
import colors from 'app/common/styles/theme/themes-vars.module.scss';

export const Paragraph = styled('p', EmotionHelper.getTransientOptions())`
  font-size: 18px;
  font-weight: 400;
  line-height: 34px;
  font-family: "Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
`;

export const SubTitle = styled('h3', EmotionHelper.getTransientOptions())`
  font-size: 21px;
  line-height: 36px;
  margin-top: 10px;
  color: #888;
  font-weight: 300;
  display: block;
`;

export const BoxTitleWrapper = styled('div', EmotionHelper.getTransientOptions())`
  position: absolute;
  top: 20px; 
  left: 45px; 
  width: 270px;
  height: 180px;
  background-size: cover;
  //background: rgba(50,45,70,0.95);
  background: rgba(0,0,0,0.75);
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 24px;
  opacity: 0.75;
`;

export const BoxTitle = styled('h2', EmotionHelper.getTransientOptions())`
  margin-bottom: 30px;
  line-height: 46px;
  font-size: 36px;
  font-weight: 500;
  position: absolute;
  top: 20px; 
  left: 45px; 
  width: 100%;
  color: white;
`;

export const Title = styled('h1', EmotionHelper.getTransientOptions())`
	font-size: 29px;
  line-height: 36px;
  margin: 0 0 30px 0;
  position: relative;
  margin-bottom: 60px;
  font-weight: 400;
  display: block;
  text-align: center;
  ::after{
		content: "";
    background: ${props => colors.primaryMain};
    bottom: -16px;
		left: 0;
		right: 0;
		width: 60px;
		height: 2px;
		border-radius: 6px;
		display: block;
		position: absolute;
		margin: 0 auto;
		text-align: center;
  }
`;

