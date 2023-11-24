import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import SideNavBar from '../Home/SideNavBar';
import { useEffect } from 'react';

function Layout() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const activePath = pathname?.split('/')[1];

  useEffect(() => {
    if (activePath === '') {
      navigate('/dashboard');
    }
  }, []);
  const layoutStyle = {
    display: 'flex',
    width: '100vw',
    overflow: 'hidden',
  };

  const sidebarStyle = {
    width: '16rem',
    // backgroundColor: '#1f2937',
    backgroundColor: 'white',
    color: 'b#1f2937'

    // color: '#ffffff',
  };

  const mainContentStyle = {
    backgroundColor: '#F6F7F9',
    width: 'calc(100vw - 16rem)',
    height: '100vh',
  };


  //   return (
  //     <>
  //       <Navbar />
  //       <div className="flex w-screen overflow-hidden h-[calc(100vh-4rem)] flex-col md:flex-row">
  //         <div className="hidden md:block md:w-64">
  //           <SideNavBar />
  //         </div>
  //         <div className="bg-[#F6F7F9] w-screen h-full md:w-[calc(100vw-16rem)]">
  //           <Outlet></Outlet>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      <Navbar />
      <div style={layoutStyle}>
        <div style={sidebarStyle}>
          <SideNavBar />
        </div>
        <div style={mainContentStyle}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
