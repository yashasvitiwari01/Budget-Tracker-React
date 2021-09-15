import React from "react";
import { Button, Modal,Label } from "semantic-ui-react";
import NewTxnForm from "./NewTxnForm";

export default function ModalEdit({error,resetEntry,idToEdit, isOpen, description, amount, isExpense, setDesc,setAmount,setTxnType, modalEditvalues}){
    return(
       <Modal open={isOpen}>
           <Modal.Header>Edit Entry</Modal.Header>
           <Modal.Content>
               <NewTxnForm 
                description = {description} 
                amount = {amount} 
                isExpense = {isExpense}
                setDesc = {setDesc}
                setAmount = {setAmount} 
                setTxnType={setTxnType}
                /></Modal.Content>
            {error ? <Label style={{color:"red"}}>{error}</Label> : null}

           <Modal.Actions>
                <Button onClick={()=>resetEntry()} negative>Cancel</Button>
                <Button onClick={()=>modalEditvalues(idToEdit) } primary>Save</Button>
           </Modal.Actions>          
       </Modal>
    )
}
