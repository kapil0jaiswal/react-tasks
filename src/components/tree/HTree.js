
import React from 'react'
import { Link } from 'react-router-dom';
import Tree from './Tree';


function HTree() {
  
  return (
    <div className="tree-center">
<Link className="btn btn-primary home"  to="/">home</Link>
<Tree/>
  
</div>
  )
}

export default HTree
