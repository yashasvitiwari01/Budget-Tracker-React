import {Header } from "semantic-ui-react";
import React from "react";

export default function MainHeader ({title, type="h2"}){
    return(
        <>
      <Header style={{marginTop:"20px"}}>{title}</Header>
    
        </>
 
    )
}