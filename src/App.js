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

  var errorFlags= {
    1: "Amount Field cannot be left blank!",
    2: "Please enter valid value for amount",
    3: "Description field cannot be left blank",
    4: "Expense cannot exceed the balance",
    5: "Cannot spend more than the balance in account"
  }
  const [entries, setEntries] = useState(initialEntries);
  const [description, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setTxnType] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  const [totalIncome,setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error,setErrorFlag] = useState();
  var [idCounter,setIdCounter] = useState(initialEntries.length);

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
    if(Number(amount) === null || description === ""){
      alert("Please enter value/values!!!");
      return;
    }
    if (isExpense && balance === 0) {
      alert("Cannot add an expense when no balance");
      resetEntry();
      return;
    }
    if(Number(amount) > balance && isExpense){
      alert("Cannot spend more than the balance in account");
      return;
    }
    if(isNaN(+amount)){
      alert("Please enter a valid value for amount");
      return;
    }

    idCounter=idCounter+1;
    setIdCounter(idCounter);

    const updatedHistoryBlock = entries.concat({id: idCounter, description:description, value: amount, isExpense});
    setEntries(updatedHistoryBlock);
    resetEntry();
  }

  const modalDisplayValues = id => {
    setIsOpen(true);
    setErrorFlag();
    let selectedIndex = entries.findIndex(entry => entry.id === id);
    const entry = entries[selectedIndex];
    setIdToEdit(id);
    setDesc(entry.description);
    setAmount(Number(entry.value));
    setTxnType(entry.isExpense);
  }

  const modalEditvalues = idToEdit => {
  //  setIsOpen(false);
    const newEntries = [...entries];
    const changedIndex = entries.findIndex(entry => entry.id === idToEdit);

     if(amount === "" && description !== ""){
       setErrorFlag(errorFlags[1]);
       return;
      }
    if(description === "" && amount !== ""){
       setErrorFlag(errorFlags[3]);
       return;
      } 
       
    if (isExpense && balance === 0) {
       setErrorFlag(errorFlags[4]);
      return;
    }
    if(Number(amount) > balance && isExpense){
       setErrorFlag(errorFlags[5]);
      return;
    }  
    if(isNaN(+amount)){
       setErrorFlag(errorFlags[2]);
      return;
    }

    newEntries[changedIndex].description = description;    
    newEntries[changedIndex].value = amount;    
    newEntries[changedIndex].isExpense = isExpense;   
    setEntries(newEntries);
    resetEntry();   
  
}

  function resetEntry(){    
    setDesc("");
    setAmount("");
    setTxnType(true);
    if(isOpen){setIsOpen(false);}
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
        <HistoryBlock entries={entries} handleDelete ={handleDelete} modalDisplayValues={modalDisplayValues}/> :  <p style={{color:"red"}}>Nothing to show here</p>}

        <MainHeader title="Add a new Transaction" type="h3"/> 
        <NewTxn handleAddTxn = {handleAddTxn} resetEntry={resetEntry} description={description} amount={amount} isExpense={isExpense} setDesc={setDesc} setAmount={setAmount} setTxnType={setTxnType}/>
    
    <ModalEdit idToEdit={idToEdit} resetEntry={resetEntry} isOpen= {isOpen} description = {description} amount = {amount} isExpense = {isExpense} setDesc={setDesc} setAmount={setAmount} setTxnType={setTxnType} modalEditvalues={modalEditvalues} error = {error}/>
    </Container>

     );
}

export default App;
