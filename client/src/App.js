import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import GenerateData from './components/GenerateData/GenerateData';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage}></Route>
        <Route exact path='/data/generate' component={GenerateData}></Route>
      </Switch>
    </Router>
  );
}

export default App;
