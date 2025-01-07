import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const styles = {
    layout: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }
  };

  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.content}>{children}</main>
      <Footer style={styles.footer} />
    </div>
  );
};

export default Layout;
