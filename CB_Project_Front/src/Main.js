import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col, FormText } from "reactstrap";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";


function Main(props){

        const navigate = useNavigate();

        //const id = props.match.params.id;    
        const {id} = useParams()

        console.log("project " + id); 


        var username='';
        
        const[prj, setPrj] = useState([]);

        useEffect(() =>{

            console.log("prj !!!!!!"+ prj.account);
            console.log(prj);
            
            fetch( "http://localhost:8080/open_sources_by_projectid/"+ id ,  {method:"GET"})
            .then(res =>res.json())
            .then(res => {setPrj(res);
            })
        },[])

        if(prj.account != null){
            username = prj.account.username;
        }

        console.log("prj !!"+ prj.account);
        console.log(prj);

        //const getAccIdFromArray = JSON.parse.values(prj);

        function getID() {
            const idString = sessionStorage.getItem('token');
            const userId = JSON.parse(idString);
            return userId.accountid;
        }
        function getUserType() {
            const idString = sessionStorage.getItem('token');
            const userId = JSON.parse(idString);
            return userId.usertype;
        }

        const currentUser = getID();
        const userType = getUserType();


        const approvePrj =(e)=>{

            //console.log("createPrj");
            e.preventDefault();
            fetch("http://localhost:8080/accept/"+getID()+"/"+id,
                {method:"PATCH", 
                headers:{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(prj)
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
                        alert("Project Approved!");
                    }     
    
                });
                window.location.reload(false);
        }

        const denyPrj =(e)=>{

            //console.log("createPrj");
            e.preventDefault();
            fetch("http://localhost:8080/deny/"+getID()+"/"+id,
                {method:"PATCH", 
                headers:{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(prj)
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
                        alert("Project Denied!");
                    }     
    
                });
                window.location.reload(false);
        }

        const deletePrj =(e)=>{

            //console.log("createPrj");
            e.preventDefault();
            fetch("http://localhost:8080/open_sources/"+id,
                {method:"DELETE", 
                headers:{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(prj)
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
                        alert("Project Canceled!");
                    }     
    
                });
            navigate("/projectInfo");
        }
        







        return(
            <body style={{ 
                backgroundImage: `url("https://media-exp1.licdn.com/dms/image/C4D1BAQHt0AHsfk3cYw/company-background_10000/0/1519799001814?e=2147483647&v=beta&t=_Yy22rAvfK59_gemQt8xvAsXOGET-YSIqXNg9N-OMh4")`,
                backgroundPosition: 'center',
                height: '745px' 
              }}>
            <div>
                <NavBar/>
                <h1 className="text-center p-3">
                    Project Info
                </h1>
                <Form>
                    <FormGroup row>
                        <Label className="text-center" sm={2}> Project Name</Label>
                        <Col sm={9}>
                        <Input type ="text" value = {prj.projectName} placeholder='Name' name = "projectName"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label sm={2} className="text-center">Summary</Label>
                    <Col sm={9}>
                        <Input type ="textarea" placeholder='Summary' name = "description" value = {prj.description}/>
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} className="text-center">Version</Label>
                    <Col sm={9}>
                        <Input type ="text" placeholder='Version' name = "versionNumber" value = {prj.versionNumber}/>
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} className="text-center">URL</Label>
                    <Col sm={9}>
                        <Input type ="url" placeholder='Url' name = "sourceLink" value = {prj.sourceLink}/>
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} className="text-center">Date Requested</Label>
                    <Col sm={9}>
                        <Input type ="text" placeholder='Date Requested' name = "requested" value = {prj.dateRequested}/>
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} className="text-center">Date Finalized</Label>
                    <Col sm={9}>

                        <Input type ="text" placeholder='Still Pending' name = "approved" value = {prj.dateFinal}/>
                        </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} className="text-center">Status</Label>
                    <Col sm={9}>
                        
                        <Input type ="text" placeholder='Status' name = "versionNumber" value = {prj.status}/>

                        </Col>
                </FormGroup>
                    <FormGroup check row>
                        <Col sm={{offset: 2, size: 10}}>
                        <Button color='success' disabled={userType != '1' || prj.status == 'Denied' || prj.status == 'Accepted' || currentUser == username} onClick={approvePrj}>
                        Approve Request
                        </Button>
                        {' '}
                        <Button color='danger' disabled={userType != '1'  || prj.status == 'Denied' || prj.status == 'Accepted' || currentUser == username} onClick={denyPrj}>
                        Deny Request
                        </Button>
                        {' '}
                        <Button color="dark" href='/projectInfo'>
                            Back to Main
                        </Button>
                        {' '}
                        <Button color='danger' disabled={prj.status == 'Denied' || prj.status == 'Accepted' || currentUser != username} onClick={deletePrj}>
                        Cancel Request
                        </Button>
                        </Col>
                    </FormGroup>
                    </Form>
                
            </div>
            </body>
        );
}
export default Main;