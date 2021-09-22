import Link from 'next/link';
import styled from 'styled-components';
import ActiveLink from './ActiveLink';

const Logo = styled.div`
  display: inline-block;
  margin-top: 3px;
  float: left;
  margin-right: 50px;
  img.logoImage {
    max-height: 38px;
    width: auto;
    position: relative;
    transform: translate3d(0, 0, 0);
  }
`;

const Container = styled.div`
  float: left;
  width: 65%;
  display: inline-block;
`;

const NavContainer = styled.nav`
  float: left;
  position: relative;
  display: block;
  ul {
    list-style: none;
    position: relative;
    float: left;
    margin: 0;
    padding: 0;
    a {
      display: block;
      text-decoration: none;
      padding: 2px 15px;
      &.nav-link {
        text-decoration: none;
      }
      &.active {
        background: rgba(249, 25, 66, 0.06);
        color: #f91942;
        border-radius: 50px;
      }
      /*&:after {
        font-family: 'FontAwesome';
        content: '\f107';
        padding-left: 7px;
      }*/
    }
    li {
      position: relative;
      float: left;
      margin: 0;
      padding: 0;
    }
  }
`;

export default function Nav({ user }) {
  return (
    <Container>
      <Logo>
        <Link href="/">
          <img className="logoImage" src="/images/logo.png" alt="profile pic" />
        </Link>
      </Logo>
      <NavContainer>
        <ul>
          <li>
            <ActiveLink activeClassName="active" href="/">
              <a className="nav-link">Home</a>
            </ActiveLink>
          </li>
          {user && (
            <>
              <li>
                <ActiveLink activeClassName="active" href="/notification">
                  <a className="nav-link">Notifications</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink activeClassName="active" href="/products">
                  <a className="nav-link">Products</a>
                </ActiveLink>
              </li>
            </>
          )}
        </ul>
      </NavContainer>
    </Container>
  );
}
