import React from "react";
import { useState } from "react";
import { Grid, Segment, Icon, Confirm, Container } from "semantic-ui-react";

// export default function History({description, value, isExpense= false}){
export default function History ({entry:{id,description, value, isExpense= false}, handleDelete, editModalEntry}){
const [ open, setOpen ] = useState(false);
const [ result, setResult] = useState("");

const handleShow = () =>{
    setOpen(true)
}

const handleCancel =() =>{
    setResult("cancelled");
    setOpen(false);
}

const handleConfirm =() =>{
    setResult("confirmed");
    setOpen(false);
    handleDelete(id);    
}
    return(
    <Container>
        <Segment color={isExpense ? "red": "green"}>
          <Grid columns ={3} textAlign="right">
          <Grid.Row>
            <Grid.Column width={10} textAlign="left" >{description}                      
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">{`$`+value}            
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
                <Icon name="edit" color="green" style={{cursor:"pointer"}} onClick={()=> editModalEntry(id)}/>
                {/* <Icon name="trash" color="red" style={{cursor:"pointer"}} onClick={()=>handleDelete(id)}/> */}
                <Icon name="trash" color="red" style={{cursor:"pointer"}} onClick={handleShow} />
            </Grid.Column>
            </Grid.Row>
            </Grid>
            </Segment>
             <Confirm
                open={open}
                result={result}
                onCancel= {handleCancel}
                onConfirm={handleConfirm} />
            
        
    </Container>
)
}