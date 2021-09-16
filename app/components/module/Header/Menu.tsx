import Link from 'next/link';
import styled from 'styled-components';

import { Menu as ReactMenu, MenuItem, MenuDivider } from '@szhsin/react-menu';

import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../../../hooks/useUser';

const Container = styled.nav`
  float: right;
  width: 35%;
  display: inline-block;
`;

const HeaderWidget = styled.div`
  position: relative;
  top: -1px;
  height: 54px;
  text-align: center;
`;

const UserMenuStyled2 = styled.div`
  position: relative;
  display: inline-block;
  //cursor: pointer;
  margin-right: 25px;
  top: 9px;
  vertical-align: top;
  padding-left: 25px;
  margin-left: 25px;
  ul {
    float: left;
    text-align: left;
    position: absolute;
    top: 45px;
    right: 0;
    list-style: none;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    display: inline-block;
    width: 180px;
    font-size: 15px;
    transform: translate3d(0, 15px, 0);
    padding: 12px 10px;
    box-sizing: border-box;
    transition: 0.25s;
    visibility: hidden;
    opacity: 0;
    z-index: 110;
    li {
      a {
        padding: 6px 15px;
        line-height: 22px;
        display: inline-block;
        color: #696969;
        transition: 0.2s;
        &:hover {
          color: #444;
        }
        i {
          width: 20px;
          position: relative;
          display: inline-block;
        }
      }
    }
  }
`;

const UserName = styled.div`
  transition: 0.2s;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 25px;
  top: 9px;
  vertical-align: top;
  padding-left: 25px;
  margin-left: 25px;
  span {
    display: inline-block;
    width: 38px;
    height: 38px;
    margin-right: 10px;
    border-radius: 50%;
    position: absolute;
    left: -22px;
    top: -5px;
    img {
      width: 100%;
      display: inline-block;
      border-radius: 50%;
      image-rendering: -webkit-optimize-contrast;
      border: 3px solid #fff;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
      box-sizing: content-box;
    }
    &:after {
      position: absolute;
      content: '';
      height: 12px;
      width: 12px;
      background-color: #38b653;
      bottom: 0;
      right: 0;
      display: block;
      border: 2px solid #fff;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
  }
  &:after {
    content: '\f107';
    font-family: 'FontAwesome';
    transition: 0.2s;
    transform: rotate(0deg);
    display: inline-block;
    margin-left: 6px;
    color: #aaa;
  }
`;

const UserNameWithDropdown = () => (
  <UserName>
    <span>
      <img src="/images/dashboard-avatar.jpg" alt="" />
    </span>
    Hi, Maxi!
  </UserName>
);

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function Menu() {
  const [logout, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  // const { openCart } = useCart();
  return (
    <Container>
      <HeaderWidget>
        <ReactMenu menuButton={UserNameWithDropdown}>
          <MenuItem>
            <Link href="/profile">Profile</Link>
          </MenuItem>
          <Link href="/profile">Profile</Link>
          <MenuItem href="/messages">Messages</MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>Log out</MenuItem>
        </ReactMenu>
      </HeaderWidget>
    </Container>
  );
}
