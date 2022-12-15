import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { List, ListInlineItem } from "reactstrap";

function ProjectItem(props){

    return(
        <div>    
        <List type="inline">
            <ListInlineItem>
                <Link to={"/Main/"+props.project.projectID}>
                    {props.project.projectName} 
                </Link>
            </ListInlineItem>
        </List>
        </div>

    );
    
}
export default ProjectItem;