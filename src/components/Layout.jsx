const Layout = ({ children }) => {
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">COFFEEAPP</h1>
        <p>For Coffee Insatiates</p>
      </div>
      <button>
        <p>Sign up free</p>
        <i class="fa-solid fa-mug-hot" />
      </button>
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Coffeeapp</span> was made by{" "}
        <a href="https://rahbar-portfolio.netlify.app/" target="_blank">
          Engr. Rahbar Ali
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export default Layout;
