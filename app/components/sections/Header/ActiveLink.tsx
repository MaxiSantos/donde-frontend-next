; import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link, { LinkProps } from 'next/link';
import React, { Children, ReactChildren } from 'react';

const ActiveLink = ({ children, activeClassName, href, ...props }) => {
  const { asPath } = useRouter();
  // https://stackoverflow.com/questions/53688899/typescript-and-react-children-type
  const child = Children.only(children);
  const childClassName = child!.props.className || '';

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

// https://www.newline.co/@bespoyasov/how-to-define-props-with-children-in-react-typescript-app--56bd18be
interface ActiveLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName: string,
  href: string
}

/*type ActiveLinkProps = React.PropsWithChildren<{  
  activeClassName: string
}>;*/


export default ActiveLink;
