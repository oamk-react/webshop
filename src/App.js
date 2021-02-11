import './App.css';
import {useState} from 'react';
import {Switch,Route} from 'react-router-dom';
import Footer from './inc/Footer';
import Header from './inc/Header';
import Navbar from './inc/Navbar';
import Home from './Home';
import Order from './Order';
import NotFound from './NotFound';

const URL = "http://localhost:8888/webshop/";

function App() {
  const [category, setCategory] = useState(null);
  const [cart, setCart] = useState([]);

  function changeCategory(category) {
    setCategory(category);
  }

  function addToCart(product) {
    setCart([...cart,product]);
  }

  return (
    <>
      <Navbar url={URL} changeCategory={changeCategory} cart={cart}/>
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route path="/" render={() => <Home url={URL} category={category} addToCart={addToCart}/>} exact />
          <Route path="/order" render={() => <Order cart={cart}/>} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
