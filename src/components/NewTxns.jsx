import React from "react";
import { Button } from "semantic-ui-react";
import NewTxnForm from "./NewTxnForm"

export default function NewTxn({handleAddTxn, resetEntry, description,amount,isExpense, setDesc,setAmount,setTxnType}){
  
  return(
    // <Form>
    <>
      <NewTxnForm description={description}
                  amount={amount}
                  isExpense = {isExpense}
                  setDesc = {setDesc}
                  setAmount = {setAmount}
                  setTxnType={setTxnType}/>
          <Button.Group style={{marginTop:"20px"}}>
            <Button onClick={()=>resetEntry()}>Cancel</Button>   
            <Button.Or/>
            <Button primary onClick={()=>handleAddTxn()}>Ok</Button>
          </Button.Group>
          </>
    // </Form>
    )
}