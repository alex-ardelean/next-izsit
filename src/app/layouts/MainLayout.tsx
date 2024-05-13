import React from "react";
import Footer from "../../components/(HeaderAndFooter)/Footer";
import Header from "../../components/(HeaderAndFooter)/Header";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showFooter = true,
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />
      <main className="flex-auto">{children}</main>
      {showFooter && <Footer className="mt-auto" />}
    </div>
  );
};

export default MainLayout;
