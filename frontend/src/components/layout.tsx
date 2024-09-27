import { Inter } from 'next/font/google';
import Footer from './footer';
import Header from './header';
interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={(inter.className, 'container mx-auto min-h-dvh')}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
