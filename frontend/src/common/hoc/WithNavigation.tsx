import { RouterView } from 'common/types';
import NavbarContainer from 'containers/NavbarContainer';
import React, { ElementType, FC } from 'react';

interface Props {
  component: ElementType;
  view: RouterView;
}

const WithNavigation: FC<Props> = ({
  component: Component,
  view,
  children,
  ...props
}) => {
  return (
    <>
      <NavbarContainer view={view} />

      <main className="pt-6">
        <Component {...props} />
      </main>
    </>
  );
};

export default WithNavigation;
