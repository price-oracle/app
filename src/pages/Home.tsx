import reactLogo from '~/assets/react.svg';
import { ConnectButton, Button } from '~/components/shared';

function Home() {
  return (
    <div className='Home'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>

      <ConnectButton />

      <Button onClick={() => console.log('test custom button')}>Test</Button>
    </div>
  );
}

export default Home;
