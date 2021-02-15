import './Order.css';
import React,{useState} from 'react';
import uuid from 'react-uuid';

export default function Order({url,cart,empty}) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [finished, setFinished] = useState(false);

  function order(e) {
    e.preventDefault();
    fetch(url + 'order/add.php',{
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        address: address,
        zip: zip,
        city: city,
        cart: cart,
      })
    })
    .then (res => {
      return res.json();
    })
    .then (
      (res) => {
        empty();
        setFinished(true);
      }, (error) => {
        alert(error);
      }
    )
  }

  let sum = 0;

  if (finished === false) {
    return (
      <div>
        <h3 className="header">Order items</h3>
        <table className="table">
          <tbody>
            {cart.map(product => {
              sum+=parseFloat(product.price);
              return (
                <tr key={uuid()}>
                  <td>{product.name}</td>
                  <td>{product.price} €</td>
                  <td></td>
                </tr>
              )
              })}
            <tr key={uuid()}>
              <td className="sumrow"></td>
              <td className="sumrow">{sum.toFixed(2)} €</td>
              <td className="sumrow"><a href="#" onClick={e => empty()}>Empty</a></td>
            </tr>
          </tbody>
        </table>
        
        {cart.length > 0 && // Render order form, if there is something in cart.
        <>
          <h3 className="header">Client information</h3>
          <form onSubmit={order}>
            <div className="form-group">
              <label>First name:</label>
              <input className="form-control" onChange={e => setFirstname(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Last name:</label>
              <input className="form-control" onChange={e => setLastname(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input className="form-control" onChange={e => setAddress(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Postal code</label>
              <input className="form-control" onChange={e => setZip(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>City</label>
              <input className="form-control" onChange={e => setCity(e.target.value)}/>
            </div>
            <div className="buttons">
              <button className="btn btn-primary">Order</button>
            </div>
          </form>
          </>
        }
      </div>
    )
  }
  else {
    return (<h3>Thank you for your order</h3>);
  }
}
