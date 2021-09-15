import React from "react";
import { useState } from "react";

export default function InterviewQuestion(){

const [value, setValue] = useState("");
const [value2, setValue2] = useState("");


const handleEvent = e => {
    setValue(e.target.value);}

const showData =()=>{
    setValue2(value);
}

    return(
        <>
            <br/>
            <form >
            <input type="text" placeholder="Enter name" onChange={(e) => handleEvent(e)}/>
            <input type="button" value="Submit" onClick = {showData} />
            <br/>
            <br/>
            </form>
            <p>{value2}</p>
            <br/>
            <br/>
            <br/>
            <br/>

        </>
    )
}
