import { useEffect, useState } from "react";
import DeviceHook from "./DeviceHook";
import axios from "axios";
const SemHook=() => {
 const[cYear,setcYear]=useState<number>(0);
 const[csem,setSem]=useState<number>(0);
 const[prvSemTag,setPrevSem]=useState<string>('');
 const[semTag,setSemTag]=useState<string>('');

    const getSemData = async () => {
          try {
            const response = await axios.get('http://localhost/server/code.php?action=getSem')
            if (response.data!==undefined) {
              setSem(response.data.csem)
              setcYear(response.data.cyear);
              setPrevSem(response.data.prevSem)
              setSemTag(response.data.semTag)
            } 
          } catch(e:any) {
            console.log(e.message)
          }
        }
        useEffect(() =>{
      getSemData();
        },[]);
 return{
    csem,cYear,prvSemTag,semTag
 }
}
 export default SemHook;