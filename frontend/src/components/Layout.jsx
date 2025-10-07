import { Outlet, useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Only show footer on homepage, profile, terms and conditions and billing pages
  const showFooter = isHomePage

  return (
    <div className={containerClasses}>
      {/* <Navbar /> */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* {showFooter && <Footer />} */}
    </div>
  );
}

export default Layout;