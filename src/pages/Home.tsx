import reactLogo from '~/assets/react.svg';
import { ConnectButton, Button } from '~/components/shared';

import Header from '../components/app/AppNavigator';

function Home() {
  const height = window.innerHeight;

  return (
    <div className='Home'>
      <Header />
    </div>
  );
}

export default Home;
