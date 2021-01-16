import React, { useState } from "react";
import { Link } from "react-router-dom";

function Todo() {
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState({});
  
  const [todo, setTodo] = useState([]);



  console.log(value);

  function Add() {
      

    var length = todo.length
    let asd ={
        id : length ,
        title : value}

        const listTodo = [...todo, asd];
           // setEdit(asd);
        setTodo(listTodo);
        
    
  }


  function removeItem(val) {
    const remaining = todo.filter((td) => todo.indexOf(td) !== val);
    setTodo(remaining);
  }

 


//   function updateR(){
     
//   document.getElementById("editInput").value={edit}; 
//   }


  function update(e,v) {
        setEdit({...edit,
            title :e.target.value});

        const key =v.id ;
        console.log("items:"+todo);
        const items = todo ;

        items.map((td)=>{      
          if(td.id===key){
            console.log(td.id +"    "+key)
            td.title= e.target.value;
          }
        })
        console.log(items);
        setTodo(items);
  }




  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-lg-3" />
    <div className="col-lg-6">  <div className="todo">
      <input className="inpouttodo " type="text" onChange={(e) => setValue(e.target.value)} />
      <button className ="btn-primary add" onClick={Add}>Add</button>
      <br />
      {todo.map((v) => (
        <div className="todoItem" key={v.id}>
          
        <input id="editinput" type= "text" value={v.title} onChange={(e)=>update(e,v)}  />
        <span className="" onClick={() => removeItem(todo.indexOf(v))}><h1> x</h1>
          </span>
          <br />
        </div>
      ))}
      </div></div> 
      <div className="col-lg-3"></div>
       
</div>    
<Link className="btn btn-primary home"  to="/">home</Link>
</div>

  );
}
export default Todo;
