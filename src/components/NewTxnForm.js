import React from "react";
import {Form, Checkbox, Segment } from "semantic-ui-react"

export default function NewTxnForm({description, amount, isExpense, setDesc, setAmount, setTxnType}){

    return( 
        <Form>
          <Form.Group> 
            <Form.Input label='Description' placeholder="Transaction Type" icon="tags" width="9" value={description} 
            onChange={(e)=>setDesc(e.target.value)}/>
            <Form.Input label='Value' placeholder="Transaction Amount" icon="dollar" iconPosition="left" width="4" value={amount} 
            onChange={(e)=>setAmount(e.target.value)}/>
            <Segment compact>
            <Checkbox toggle label="Is Expense?" checked={isExpense} onChange ={() => setTxnType(prevState => !prevState)}></Checkbox>
            </Segment>
          </Form.Group>
        </Form>
    )
} 