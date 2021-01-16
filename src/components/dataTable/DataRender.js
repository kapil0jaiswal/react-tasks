import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "./Datatable";

export default function DataRender() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");

  function getData() {
    Axios.get("/todo").then((res) => setData(res.data));
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  function doSort(){
    console.log("clicked");
    if (order === "asc") {
      setOrder("desc");
      Axios.get("/todo/desc").then((res) => setData(res.data));
    } else if (order === "desc") {
      setOrder("asc");
      Axios.get("/todo/asc").then((res) => setData(res.data));
    } else {
      getData();
    }
  }

  return (
    <div className="dr">
      <Link className="btn btn-primary home"  to="/">home</Link>
      <button className="btn btn-primary sort" onClick={doSort}>Sort</button>
      <Datatable data={data} />
    </div>
  );
}
