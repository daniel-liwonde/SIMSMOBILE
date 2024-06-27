const PrintSlot=(d:number) => {
    if(d===0)
    {
     return "8:00-9:30";
    }
     else if(d===1)
     {
     return "9:30-11:00"
     }
     else if(d===2)
     {
     return "11:00-12:30";
     }
     else if(d===3)
     {
     return "12:30-2:00";
     }
     else if(d===4)
     {
     return "2:00-3:30";
     }
     else
     return "3:30-5:00";
 }
 export default PrintSlot;