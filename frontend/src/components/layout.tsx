import { Inter } from 'next/font/google';
import Footer from './footer';
import Header from './header';
import { ThemeProvider } from '@/components/theme-provider';
interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-dvh">
        <Header />
        <main className={(inter.className, 'container mx-auto pt-10')}>
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
