import { Outlet } from 'react-router-dom';
import Header from '../components/app/AppNavigator';

function AppPage() {
  return (
    <div className='Home'>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppPage;
