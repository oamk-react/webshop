import './Navbar.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Cart from './Cart';

export default function Navbar({url,cart,setFirstCategory}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const address = url + 'products/getcategories.php';
    fetch(address)
    .then(res => res.json())
    .then (
      (res) => {
        setCategories(res);
        setFirstCategory(res[0]);
      },(error)=> {
        alert(error);
      }
    )
  }, [])

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Web shop</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
            <ul className="dropdown-menu" aria-labelledby="dropdown01">
              {categories.map(category => (
                //<li key={category.id}><a className="dropdown-item" href="#" onClick={e => changeCategory(category)}>{category.name}</a></li>
                <li key={category.id}>
                  <Link 
                    className="dropdown-item" 
                    to={{
                      pathname: '/',
                      state: {
                        id: category.id,
                        name: category.name
                      }
                    }}
                    >{category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <ul className="navba-nav ml-auto">
          <li className="nav-item">
            <Cart cart={cart} />
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
