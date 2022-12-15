import './App.css';
import { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, NavLink }
  from 'reactstrap';
import Main from './Main';
import NewProject from './NewProject';
import ProjectInfo from './ProjectInfo';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';
import Background from './components/background.png';
import NavBar2 from "./components/NavBar2";


function Login({setToken}) {
  /*const[accdata, setAccdata] = useState({
    username:'',
    password:''});*/
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();  
    const handleSubmit = (e) => {
      //e.preventDefault();
      const user = { username, password };
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' },
        body: JSON.stringify(user),
        credentials : 'same-origin',
        }).then((res) => {
          console.log(res)     
          return res.json(); 
        }).then((res) =>{
          console.log(res);
          setToken(res);
        });
      }
  /*const changeValue=(e)=>{
    console.log(e);
    setAccdata({
        ...accdata, [e.target.name]:e.target.value
    });
    console.log(e.target.name);
    console.log(e.target.value);*/
    const createAccAdmin =(e)=>{
      const user = {username,password};
      e.preventDefault();
      if(username == null || password == null){
        alert("Fields cannot be empty");
        return null;
      }
      fetch("http://localhost:8080/account_admin",
          {method:"POST", 
          headers:{
              "Content-Type" :"application/json"
          },
          body:JSON.stringify(user)
          })
          .then(res=>{
              if(res.status == 201){
                  return res.json();
              }
              else{
                  return null;
              }
          })
          .then(res=>{
              if(res!=null){
                  alert("Admin Account Created");
              }     
          });
  }
const createAcc =(e)=>{
    const user = {username,password};
    e.preventDefault();
    if(username == null || password == null){
      alert("Fields cannot be empty");
      return null;
    }
    fetch("http://localhost:8080/account",
        {method:"POST", 
        headers:{
            "Content-Type" :"application/json"
        },
        body:JSON.stringify(user)
        })
        .then(res=>{
            if(res.status == 201){
                return res.json();
            }
            else{
                return null;
            }
        })
        .then(res=>{
            if(res!=null){
                alert("Account Created");
            }     
        });
}
  return (
    <body style={{ 
      backgroundImage: `url("https://www.commercebank.com/-/media/cb/articles/personal/2017/tips-for-making-the-most-of-your-job.jpg?sc=1&revision=94074016-44d3-413d-930b-02d4df1563f3&modified=20170908165600&hash=6DB8549D6B60B0A6EFAA8619E003EC5A")`,
      backgroundPosition: 'center',
      height: '745px' 
    }}>
    <div>
    <NavBar2/>
    <Form className="login-form">
      <h1 className='text-center font-size: 40px marginBottom: 40px'>Login</h1>
      <FormGroup><Label>{' '}</Label></FormGroup>
      <FormGroup>
        <Label>Username</Label>
        <Input type ="username" placeholder='Username' name = "username" onChange = {(e)=> setUsername
    (e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type ="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} name = "password"/>
      </FormGroup>
      <Button href='/projectInfo' block color='dark' placeholder = 'login' type = "submit" onClick= {handleSubmit}>
        Login
        </Button>
        <div className='text-center pt-3 pb-3'>
          Or create a new account.
        </div>
        <Button block color='success' placeholder='create' onClick = {createAcc}>
        Create Account
        </Button>
        <Button block color='transparent' placeholder='createAdmin' onClick = {createAccAdmin}>
        <div className='pt-3 pb-3'>Create Admin Account</div>
        </Button>
    </Form>
    </div>
    </body>
  );
  }
export default Login;