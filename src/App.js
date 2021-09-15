import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { Container } from "semantic-ui-react"; 

import MainHeader from './components/MainHeader';
import DisplayBalance from './components/DisplayBalance';
import HistoryBlock from './components/HistoryBlock';
import NewTxn from './components/NewTxns';
import DisplayGrid from './components/DisplayGrid';
import ModalEdit from "./components/ModalEdit";
// import InterviewQuestion from './components/InterviewQuestion';

function App() {
  var initialEntries  = [
    {
      id: 1,
      description : "Work Income",
      value: 5000,
      isExpense: false
    },
     {
      id: 2,
      description : "House Rent",
      value: 200,
      isExpense: true
    },
     {
      id: 3,
      description : "Water Bill",
      value: 50,
      isExpense: true
    },
     {
      id: 4,
      description : "ELectricity Bill",
      value: 100,
      isExpense: true
    }
  ]
  const [entries, setEntries] = useState(initialEntries);
  const [description, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setTxnType] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  const [totalIncome,setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  
useEffect(()=>{
  if(!isOpen && idToEdit){
    const newEntries = [...entries];
    const changedIndex = entries.findIndex(entry => entry.id === idToEdit);
    newEntries[changedIndex].description = description;    
    newEntries[changedIndex].value = amount;    
    newEntries[changedIndex].isExpense = isExpense;   
    setEntries(newEntries);
    resetEntry();
  }// eslint-disable-next-line
},[isOpen]); 


useEffect(() => {
  let totalIncomeAmount = 0;
  let totalExpenseAmount = 0;
  let totalBalanceAmount = 0;

entries.map(entry => {
  if(entry.isExpense){
   return (totalExpenseAmount += Number(entry.value));
  }
  return (totalIncomeAmount += Number(entry.value)) ;
 });

 totalBalanceAmount = totalIncomeAmount - totalExpenseAmount;
 
 (totalBalanceAmount > 0) ? setBalance(totalBalanceAmount) : setBalance(0);
 
 setTotalIncome(totalIncomeAmount);
 setTotalExpenses(totalExpenseAmount);
},[entries]);

  const handleDelete = id =>{
    const updatedHistoryBlock = entries.filter((entry) => entry.id !== id);
    setEntries(updatedHistoryBlock);
  }

  const handleAddTxn = () =>{

    if(amount === "" || description === ""){
      alert("Please enter value/values!!!");
      return;
    }
    if (isExpense && balance === 0) {
      alert("Cannot add an expence when no balance");
      resetEntry();
      return;
    }
    if(amount > balance && isExpense){
      alert("Cannot spend more than the balance in account");
      return;
    }

    var newEntry = entries.length+1;
    const updatedHistoryBlock = entries.concat({id: newEntry, description:description, value: amount, isExpense});
    setEntries(updatedHistoryBlock);
    resetEntry();
  }

  const editModalEntry = id => {
    let selectedIndex = entries.findIndex(entry => entry.id === id);
    const entry = entries[selectedIndex];
    setIdToEdit(id);
    setDesc(entry.description);
    setAmount(entry.value);
    setTxnType(entry.isExpense);
    setIsOpen(true);
  }

  function resetEntry(){    
    setDesc("");
    setAmount("");
    setTxnType(true);
  }

  return (
    <Container >
        <MainHeader title="Budget"/>
        <DisplayBalance title="Your Balance"  value = {balance} size="small"/>
      {balance > 0 ? null : (
        <p style={{ color: "red" }}>Oops!! You have exhausted your balance!</p>
      )}
        <DisplayGrid totalIncome={totalIncome} totalExpenses = {totalExpenses}/>
        <MainHeader title="History" type="h3" />
        {(entries.length > 0) ?
        <HistoryBlock entries={entries} handleDelete ={handleDelete} editModalEntry={editModalEntry}/> :  <p style={{color:"red"}}>Nothing to show here</p>}

        <MainHeader title="Add a new Transaction" type="h3"/> 
        <NewTxn handleAddTxn = {handleAddTxn} description={description} amount={amount} isExpense={isExpense} setDesc={setDesc} setAmount={setAmount} setTxnType={setTxnType}/>
    
    {/* <InterviewQuestion /> */}
    <ModalEdit isOpen= {isOpen} setIsOpen={setIsOpen} description = {description} amount = {amount} isExpense = {isExpense} setDesc={setDesc} setAmount={setAmount} setTxnType={setTxnType}/>
    </Container>

     );
}

export default App;
