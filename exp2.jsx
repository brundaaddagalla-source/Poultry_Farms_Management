import {useState} from "react"
function charan(){
    const[count,setcount]=useState(0);
    function counthandler(){
        setcount=count+1
    }
    return (
        <>
            <button onclick={counthandler}>IN</button>
        </>
    )
}