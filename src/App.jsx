import reactLogo from './assets/react.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './store/slices/counter';
import.meta.env.MODE

export const App = () => {
  
  const {counter} = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const version = import.meta.env.VITE_APP_VERSION;
  
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <span>Version {version}</span>
      <div className="card">
        <button onClick={() => dispatch(increment())}>
          count is {counter}
        </button>
      </div>
    </div>
  )
};
