"use client";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "whitesmoke",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
