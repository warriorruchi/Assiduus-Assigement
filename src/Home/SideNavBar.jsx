import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const sideBarList = [
  { title: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { title: 'Accounts', path: '/accounts', icon: 'account_balance_wallet' },
  { title: 'Payroll', path: '/payroll', icon: 'attach_money' },
  { title: 'Reports', path: '/reports', icon: 'description' },
  { title: 'Advisor', path: '/advisor', icon: 'person' },
  { title: 'Contacts', path: '/contacts', icon: 'contacts' },
];

function SideNavBar() {
  const { pathname } = useLocation();
  const activePath = pathname?.split('/')[1];

  const containerStyle = {
    paddingTop: '1rem',
  };

  const linkStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
    marginBottom: '0.5rem',
    paddingLeft: '30%',
    backgroundColor: '#ffffff',
  };

  return (
    <div style={containerStyle}>
      {sideBarList.map(item => (
        <Link
          to={item.path}
          key={item.title}
          className={clsx('link', { active: `/${activePath}` === item.path })}
          style={{
            ...linkStyle,
            backgroundColor: `/${activePath}` === item.path ? '#4caf50' : `/${activePath}` !== item.path ? 'white' : '',
            color: `/${activePath}` === item.path ? '#ffffff' : '',
          }}
        >
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            {item.icon}
          </span>
          <p>{item.title}</p>
        </Link>
      ))}
    </div>
  );
}

//   return (
//     <div className="py-4">
//       {sideBarList.map(item => (
//         <Link to={item?.path} key={item.title} className={clsx('w-full gap-3 py-4 mb-2 flex items-center pl-[30%]', { 'hover:bg-green-100': `/${activePath}` !== item.path }, { 'bg-green-600 text-white': `/${activePath}` === item.path })}>
//           <span className="material-symbols-outlined">{item.icon}</span>
//           <p>{item.title}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }

export default SideNavBar;
