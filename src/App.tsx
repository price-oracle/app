import reactLogo from './assets/react.svg';
import './App.css';
import { ConnectButton } from '~/components/shared';

function App() {
  const TestClick = () => {
    console.log('test');
  };

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>

      <ConnectButton />
    </div>
  );
}

export default App;
