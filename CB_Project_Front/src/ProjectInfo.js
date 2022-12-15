import React, { Component, useEffect, useState } from "react";
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavLink, Table } from "reactstrap";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import NavBar3 from "./components/NavBar3";
import ProjectItem from "./ProjectItem";

function ProjectInfo(props){

    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
   
        const[prjs, setProjects] = useState([]);

        
        useEffect(() =>{
            
            fetch( "http://localhost:8080/open_sources" ,  {method:"GET"})
            .then(res =>res.json())
            .then(res => {setProjects(res);
            
            console.log("prjs id "+ prjs);
            })
        },[])

        function handleSort() {
            let sortedProjects = [...prjs];
            sortedProjects.sort((a,b) => {
                if(a.projectName < b.projectName){
                    return -1;
                }
                if(a.projectName > b.projectName){
                    return 1;
                }
                return 0;
            });
            setProjects(sortedProjects);
            
        }

        return(
            <body style={{ 
                backgroundImage: `url("https://media-exp1.licdn.com/dms/image/C4D1BAQHt0AHsfk3cYw/company-background_10000/0/1519799001814?e=2147483647&v=beta&t=_Yy22rAvfK59_gemQt8xvAsXOGET-YSIqXNg9N-OMh4")`,
                backgroundPosition: 'center',
                height: '745px' 
              }}>
            <div>
                <NavBar3/>
                <div className="d-flex justify-content-end p-1">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret>Sort </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem><div onClick ={() =>{
                            fetch( "http://localhost:8080/open_sources" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}>Default</div>
                        </DropdownItem>
                        <DropdownItem><div onClick ={() =>{
                            fetch( "http://localhost:8080/open_sources_name_asc" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}>Project Name A-Z</div>
                        </DropdownItem>
                        <DropdownItem><div onClick ={e =>{
                            fetch( "http://localhost:8080/open_sources_name_desc" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}>Project Name Z-A</div></DropdownItem>
                        <DropdownItem><div onClick ={() =>{
                            fetch( "http://localhost:8080/open_sources_status_asc" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}>Status Ascending</div></DropdownItem>
                        <DropdownItem><div onClick ={() =>{
                            fetch( "http://localhost:8080/open_sources_status_desc" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}>Status Descending</div></DropdownItem>
                        <DropdownItem><div onClick ={() =>{
                            fetch( "http://localhost:8080/open_sources_daterequested_asc" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}> Requested Date Ascending</div>
                        </DropdownItem>
                        <DropdownItem><div onClick ={() =>{
                            fetch( "http://localhost:8080/open_sources_daterequested_desc" ,  {method:"GET"})
                            .then(res =>res.json())
                            .then(res => {setProjects(res);})
                        }}> Requested Date Descending</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
                <Table dark striped bordered hover>
                <thead>
                    <tr>
                    <th>Project Name</th>
                    <th>Link</th>
                    <th>Description</th>
                    <th>Version</th>
                    <th>Date Requested</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {prjs.map( prj=>                
                    <tr key={prj.projectID}>
                         
                        <td><ProjectItem key={prj.projectID} project={prj}></ProjectItem></td>
                         
                        <td>{prj.sourceLink}</td>
                        <td>{prj.description}</td>
                        <td>{prj.versionNumber}</td>
                        <td>{prj.dateRequested}</td>
                        <td>{prj.status}</td>
                    </tr>    
                )}
                </tbody>
                </Table>
            </div>
            </body>
        );
    
}
export default ProjectInfo;