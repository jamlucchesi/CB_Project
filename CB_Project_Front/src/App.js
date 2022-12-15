import './App.css';
import Login from './Login';
import Main from './Main';
import NewProject from './NewProject';
import ProjectInfo from './ProjectInfo';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { Container, Navbar, NavbarToggler } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function setToken(userToken) {
  //console.log("tokenTEst")
  //console.log(userToken)
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}


function getID() {
  const idString = sessionStorage.getItem('token');
  const userId = JSON.parse(idString);
  return userId.accountid;
}


function App() {
  const token = getToken();

  var accountid = 0;

  if(token!=null){
  accountid = getID(); 
  } 

  console.log("accountid " + accountid)

  if(!token){
    return (
      <div>
        <Login setToken = {setToken}></Login>
      </div>
    );

  }
  else{
  return (
    <div>
      <Routes>
      <Route path="/" exact={true} element= {<Login/>} />
      <Route path="/main/:id" exact={true} element= {<Main/>} />
      <Route></Route>
      <Route path="/newProject" exact={true} element= {<NewProject/>} />
      <Route path="/projectInfo" exact={true} element= {<ProjectInfo/>} />
      </Routes>
    </div>
  );
  }
}
export default App;
