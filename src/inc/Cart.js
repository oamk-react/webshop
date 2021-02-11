import React from 'react';
import {Link} from 'react-router-dom';

export default function Cart({cart}) {
  return (
    <Link to="/order">
      <span style={{color: 'white'}}>{cart.length}</span>
    </Link>
  )
}
