const Layout = ({ children }) => {
  const header = <header></header>;

  const footer = <footer></footer>;

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export default Layout;
