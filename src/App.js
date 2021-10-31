import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import { Route, Switch } from 'react-router';
import Home from './pages/home';
import Navbar from './components/navbar';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Management from './pages/management';
import User from './pages/user';

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/management' component={Management} />
      <Route path='/user' component={User} />
    </Switch>
    </>
  );
}

export default App;
