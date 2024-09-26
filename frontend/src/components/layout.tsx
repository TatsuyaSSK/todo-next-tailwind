import Footer from './footer';
import Header from './header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="mx-auto mt-10 max-w-xl space-y-10">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
