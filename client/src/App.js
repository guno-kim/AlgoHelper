import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage';
import Header from './components/Header/Header'
import ProblemList from './components/pages/ProblemList/ProblemList'
import Problem from './components/pages/Problem/index'
import ProblemCreate from './components/pages/ProblemCreate/index'
import Test from './components/pages/Test/index'
import Profile from './components/pages/Profile/index'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>      
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/problem/create' component={ProblemCreate}></Route>
          <Route exact path='/problem' component={ProblemList}></Route>
          <Route exact path='/problem/:problem_Id' component={Problem}></Route>
          <Route exact path='/problem/:problem_Id/test' component={Test}></Route>
          <Route exact path='/user/profile' component={Profile}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
