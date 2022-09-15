import { styled } from '@mui/material/styles';

export const ContactLink = styled("ul")`
  list-style: none;
	margin: 0;
	padding: 0;
	display: block;
  li{
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 0;
    :first-child a{
      border-top-left-radius: 3px; border-bottom-left-radius: 3px;
      border-left: none;
    }
    :last-child a{
      border-top-right-radius: 3px; border-bottom-right-radius: 3px;
    }
    a {
      margin-bottom: 10px;
      background: #f2f2f2;
      color: #555;
      font-weight: 500;
      font-size: 13px;
      padding: 7px 14px;
      transition: 0.3s;
      display: inline-block;
      line-height: 17px;
      font-weight: 500;
      position: relative;
      border-left: 1px solid #e0e0e0; 
      :hover{
        color: #555; background: #eaeaea; opacity: 1;
      }
    }
  }
`
