import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Auth from './hoc/Auth'
import LandingPage from './components/pages/LandingPage';
import Header from './components/Header/Header'
import ProblemList from './components/pages/ProblemList/ProblemList'
import Problem from './components/pages/Problem/index'
import ProblemCreate from './components/pages/ProblemCreate/index'
import Test from './components/pages/Test/index'
import Profile from './components/pages/Profile/index'
import Login from './components/pages/Login/index'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>      
        <Switch>
          <Route exact path='/' component={Auth(LandingPage,false)}></Route>
          <Route exact path='/problem/create' component={Auth(ProblemCreate,true)}></Route>
          <Route exact path='/problem' component={Auth(ProblemList,false)}></Route>
          <Route exact path='/problem/:problem_Id' component={Auth(Problem,true)}></Route>
          <Route exact path='/problem/:problem_Id/test' component={Auth(Test,true)}></Route>
          <Route exact path='/user/profile' component={Auth(Profile,tru)}></Route>
          <Route exact path='/user/login' component={Auth(Login,false)}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
