import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Show footer on all pages except auth pages
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;