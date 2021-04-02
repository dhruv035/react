import axios from "axios";
import react,{useState,useEffect} from "react";
import Displayer from "./mappingjson";
import Query, {execute,Position} from "./query";
import Losser from "./losser";
function Attempt(){
    let textInput= react.useRef<HTMLInputElement>(null);  
    const [user,setUser]=useState("");
    const [resp,setResp]=useState("0");
    const [mapp,setMapp]=useState([]);
    const [flag,setFlag]=useState(0);
    useEffect(()=>{
      async function getData(){
        const response=await execute(Query(user));
        
        if(response.liquidityPositionSnapshots[0]){
        setResp(response.liquidityPositionSnapshots[0].liquidityTokenBalance);
        setMapp(response.liquidityPositionSnapshots)
        setFlag(1)
        console.log(response.liquidityPositionSnapshots)
  
        }
        else
        {
        setResp("0")
        setMapp([])
        setFlag(0)
      }
        console.log('Called')
      }
      if(user)
     getData();
    },[user]); 
    function handleClick(){
  
      if(textInput.current){
      setUser(textInput.current.value.toLowerCase())
      }
  
    };
    return(
      <div
      >
        <input type = "text" ref={textInput}/>
        <button type="button" onClick={()=>handleClick()}>Get Value</button>
        {parseFloat(resp)}
        <Displayer data={mapp} flag={flag}/>
        </div>
        
    );
  }
  export default Attempt