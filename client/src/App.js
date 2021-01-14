import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage';
import GenerateData from './components/pages/GenerateData/GenerateData';
import Header from './components/Header/Header'
import ProblemList from './components/pages/ProblemList'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>      
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/data/generate' component={GenerateData}></Route>
          <Route exact path='/problemList' component={ProblemList}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
