import React from "react";
import { Container } from "semantic-ui-react";
import History from "./History";
// export default function History({description, value, isExpense= false}){
export default function HistoryBlock ({entries, handleDelete,modalDisplayValues}){
    return(
        <Container>
        {/* {entries.map((entry) => {
          return(
            <History description={entry.description} value={entry.value} isExpense = {entry.isExpense}/>
        )})} */}
        {/* above block of statements is equivalent to the one written below */}
        {entries.map((entry) => (
            <History key={entry.id} 
            // description={entry.description} value={entry.value} isExpense = {entry.isExpense}/>
            // instead of passing on individual values, we are passing the entire object and handle it
            // in the called component
            entry = {entry}  
            handleDelete ={handleDelete}
            modalDisplayValues = {modalDisplayValues} />
        ))}

{/* above block of statements is equivalent to the one written below as above we are looping through the
contents of the array while below we were calling its 3 times making the code redundant  */}
        
{/* 
        <History description={entries[1].description} value={entries[1].value} isExpense = {entries[1].isExpense}/>
        <History description={entries[2].description} value={entries[2].value} isExpense = {entries[2].isExpense}/>
        <History description={entries[3].description} value={entries[3].value} isExpense = {entries[3].isExpense}/> */}
 
</Container>   
    )
}