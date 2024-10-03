import { Provider } from 'react-redux';
import './App.css';
import DataDisplay from './component/dataDisplay';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DataDisplay />
      </div>
    </Provider>
  );
}

export default App;
