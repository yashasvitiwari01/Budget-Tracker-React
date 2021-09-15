import React from "react";
import { Button, Modal } from "semantic-ui-react";
import NewTxnForm from "./NewTxnForm";

export default function ModalEdit({isOpen, setIsOpen, description, amount, isExpense, setDesc,setAmount,setTxnType}){
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
           <Modal.Actions>
                <Button onClick={()=>setIsOpen(false)} negative>Cancel</Button>
                <Button onClick={()=>setIsOpen(false)} primary>Save</Button>
           </Modal.Actions>          
       </Modal>
    )
}
