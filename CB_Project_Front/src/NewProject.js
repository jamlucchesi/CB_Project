import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";


function NewProject(props){

    function getID() {
        const idString = sessionStorage.getItem('token');
        const userId = JSON.parse(idString);
        return userId.accountid;
      }

    const[prjdata, setPrjdata] = useState({
        projectName:'',
        description:'',
        versionNumber:'',
        sourceLink:''
    
    })

  
    const changeValue=(e)=>{
        console.log(e);
        setPrjdata({
            ...prjdata, [e.target.name]:e.target.value
        });

        console.log(e.target.name);
        console.log(e.target.value);
    }



    const createPrj =(e)=>{

        //console.log("createPrj");
        e.preventDefault();
        fetch("http://localhost:8080/open_sources/create/"+getID(),
            {method:"POST", 
            headers:{
                "Content-Type" :"application/json"
            },
            body:JSON.stringify(prjdata)
            })
            .then(res=>{
                if(res.status == 201){
                    return res.json();
                }else{
                    return null;
                }
            })
            .then(res=>{
                if(res!=null){
                    alert("Project Created!");
                }     

            });

    }

        return(
            <body style={{ 
                backgroundImage: `url("https://www.commercebank.com/-/media/cb/articles/personal/2017/tips-for-making-the-most-of-your-job.jpg?sc=1&revision=94074016-44d3-413d-930b-02d4df1563f3&modified=20170908165600&hash=6DB8549D6B60B0A6EFAA8619E003EC5A")`,
                backgroundPosition: 'center',
                height: '745px' 
              }}>
            <div>
                <NavBar2/>
            <Form className="login-form" onSubmit ={createPrj} >
                <h1 className="text-center">
                    Project Request
                </h1>
                <FormGroup><Label>{' '}</Label></FormGroup>
                <FormGroup>
                    <Label>Name</Label>
                        <Input type ="text" placeholder='Name' onChange={changeValue} name = "projectName"/>
                </FormGroup>
                <FormGroup>
                    <Label>Summary</Label>
                        <Input type ="textarea" placeholder='Summary'  onChange={changeValue} name = "description"/>
                </FormGroup>
                <FormGroup>
                    <Label>Version</Label>
                        <Input type ="text" placeholder='Version' onChange={changeValue} name = "versionNumber"/>
                </FormGroup>
                <FormGroup>
                    <Label>URL</Label>
                        <Input type ="url" placeholder='Url' onChange={changeValue} name = "sourceLink"/>
                </FormGroup>
                <Button block color='success' type="submit">
                Create
                </Button>
                <div className="pt-3">

                </div>
                <Button block color="dark" href='/projectInfo'>
                    Back to Main
                </Button>
            </Form>
            </div>
            </body>
        );
}
export default NewProject;