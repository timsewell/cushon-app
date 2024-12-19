import cushonLogo from '/cushon-final-logo-RGB.png';
import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href='https://www.cushon.co.uk/' target='_blank'>
          <img src={cushonLogo} className='logo' alt='Vite logo' />
        </a>
      </div>
      <h1>NatWest Cushon Coding Exercise / Tim Sewell</h1>
      <Button variant='link' onClick={() => navigate('/selector')}>
        Single
      </Button>
      <Button
        variant='link'
        onClick={() => navigate('/selector?multiple=true')}
      >
        Multiple
      </Button>
    </>
  );
}

export default App;
