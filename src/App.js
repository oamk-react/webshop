import './App.css';
import {useState,useEffect} from 'react';
import {Switch,Route, useLocation} from 'react-router-dom';
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

  let location = useLocation();

  // Location state (selected category) changes, update category (and related components);
  useEffect(() => {
    if (location.state!==undefined) {
      setCategory({id: location.state.id,name: location.state.name});
    }
  }, [location.state])

  // Callback function sets first category to be selected, when webshop is opened (for the first time).
  function setFirstCategory(category) {
    setCategory(category);
  }
  
  // Callback function add product to cart.
  function addToCart(product) {
    setCart([...cart,product]); // This is immutable, add product to cart and create a new array. 
  }

  return (
    <>
      <Navbar url={URL} setFirstCategory={setFirstCategory} cart={cart}/>
      <Header />
      <div id="content" className="container-fluid">
        <Switch>
          <Route path="/" render={() => <Home url={URL} category={category} addToCart={addToCart}/>} exact />
          <Route path="/order" render={() => <Order url={URL} cart={cart}/>} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
