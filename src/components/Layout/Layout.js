import React from 'react';
import styled from 'styled-components';

const Layout = ({children}) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 1200px;
  min-width: 992px;
  height: 100vh;
  background-color: #f0efe9;
  margin: auto;
`;
