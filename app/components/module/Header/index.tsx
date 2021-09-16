import styled from 'styled-components';
import Link from 'next/link';

import Nav from './Nav';
import Menu from './Menu';
import { useUser } from '../../../../hooks/useUser';
import Cart from '../Cart/Cart';

const HeaderContainer = styled.header`
  width: 100%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  z-index: 999;
  padding: 18px 0 8px 0;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  font-size: 16px;
`;

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0 40px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 80%;
  &:before {
    content: ' ';
    display: table;
  }
  &:after {
    content: ' ';
    display: table;
    clear: both;
  }
`;

export default function Header() {
  //const user = useUser();
  const user = {};
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Container>
          <Nav user={user} />
          {user ? <Menu /> : <Link href="/signin">Sign in</Link>}
        </Container>
      </HeaderWrapper>
      {/* <Cart /> */}
    </HeaderContainer>
  );
}
