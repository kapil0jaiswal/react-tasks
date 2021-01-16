import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AvailableVehicle() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[booking,setBooking] = useState({})

  function getData() {
    Axios.get("/vehicle/avail").then((res) => setData(res.data));
  }

  useEffect(() => {

    getData();
    setInterval(() => {
      getData();
      console.log("data refreshed every 10 secs"+new Date());
    }, 10000);
  }, []);

function onChangehandler(name,value){
    console.log( name +":"+ typeof value)
    if(name==='pickup'||name==='drop_time'){
       value= value.replace("T"," ");
       value=value+":00";
       console.log(name+""+value)
    }
    
    setBooking({...booking ,
        [name] : value
    });

}
function doBook(){
 console.log("booking clicked")
    Axios.post("/booking",booking).then((res)=> console.log(res));
    getData();
    handleClose();
}

  return (
    <div className="align-cengter">
      <h1 class="textheading"> Available Vehicles</h1>
      <div className="vehicle-grid">
        {data.map((d) => (
          <div class="vehicle-display">
            vehicle id : {d.v_id}
            <br />
            vehicle name :{d.vehicalName}
            <br />
            vehicle type :{d.v_type}
            <br />
            <button className="book-btn btn btn-primary" onClick={handleShow}>
              Book
            </button>
          </div>
        ))}
        <Link className="btn btn-primary home"  to="/">home</Link>
      </div>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <input type="text" name="b_id" onChange={(e)=>onChangehandler(e.target.name,e.target.value)}/><br/> */}
            Vehicle Id :  <select name="v_id"onChange={(e)=>onChangehandler(e.target.name,e.target.value)}>
                {data.map((d)=><option>{d.v_id}</option>)}
            </select><br/>
            Start Time : <input type="datetime-local" name="pickup" onChange={(e)=>onChangehandler(e.target.name,e.target.value)}/><br/>
            End Time :  <input type="datetime-local" name="drop_time" onChange={(e)=>onChangehandler(e.target.name,e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={doBook}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
