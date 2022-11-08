import { Outlet } from 'react-router-dom';
import reactLogo from '~/assets/react.svg';
import { ConnectButton, Button } from '~/components/shared';
import Header from '../components/app/AppNavigator';

function AppPage() {
  const height = window.innerHeight;

  return (
    <div className='Home'>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppPage;
