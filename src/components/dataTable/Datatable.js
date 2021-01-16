import React from 'react'
import { Table } from 'react-bootstrap';
export default function Datatable({data}) {
   // const [order,setOrder] = useState(false);
   const keyss = data[0] && Object.keys(data[0]);
    console.log("..................")
   console.log({data})
   console.log(keyss)

   return (
      <div className="container">
      <div className="tablexx"><Table  classname="tbl" responsive border="2" >
         <thead className="table-head">
            <tr>
         {data[0]&&keyss.map((d)=><td ><p className="tabledata">{d}</p></td>)}
         </tr>
         </thead>
         <tbody>
   {data.map((d)=><tr  className="table-data">{keyss.map((k)=><td ><p className="tabledata">{d[k]}</p></td>)}</tr>)}
            
         </tbody>
         </Table>
      </div>
      </div>
   )
}
