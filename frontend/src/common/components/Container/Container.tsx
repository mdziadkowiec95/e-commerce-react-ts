import React, { FC } from 'react';

const Container: FC = ({ children }) => {
  return <div className="container px-5">{children}</div>;
};

export default Container;
