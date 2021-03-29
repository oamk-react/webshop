import './App.css';
import {useState,useEffect} from 'react';
import {Switch,Route, useLocation} from 'react-router-dom';
import Footer from './inc/Footer';
import Header from './inc/Header';
import Navbar from './inc/Navbar';
import Home from './Home';
import Order from './Order';
import NotFound from './NotFound';

// Define constant for backend base url. This variable is passed to subcomponents, so this
// is the only variable which needs to be updated in case url needs to be changed.
const URL = "http://localhost:8888/webshop/";

function App() {
  const [category, setCategory] = useState(null); // Selected category.
  const [searchPhrase, setSearchPhrase] = useState(''); // Search phrase if user makes a search.
  const [cart, setCart] = useState([]); // Shopping cart.

  let location = useLocation(); // Get possible parameters passed when user changes category on navigation.
 
  // If component is mounted (e.g. user refreshes browser), check if cart is on localstorege
  // and read contents if found.
  useEffect(() => {
   if ('cart' in localStorage) {
    setCart(JSON.parse(localStorage.getItem('cart')));
   }
  }, [])

  // Location state (selected category) changes, update category (and related components).
  // This is fired, when category is changed on navigation bar.
  useEffect(() => {
    if (location.state!==undefined) {
      // If category is changed, id and name of the category are passed here in url.
      // This information is used to create category object, since home component is receiving 
      // category object (not just id or name).
      setCategory({id: location.state.id,name: location.state.name});
      setSearchPhrase('');
    }
  }, [location.state])
 

  return (
    <>
      <Navbar url={URL} cart={cart} setCategory={setCategory}/>
      <Header search={search}/>
      <div id="content" className="container-fluid">
        <Switch>
          <Route path="/" render={() => <Home 
            url={URL} 
            category={category}
            search={searchPhrase} 
            addToCart={addToCart}/>} 
            exact 
          />
          <Route path="/order" render={() => <Order url={URL} cart={cart} empty={emptyCart}/>} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );

  // Callback function add product to cart.
  function addToCart(product) {
    const newCart = [...cart,product]; // Create new immutable array for updating state and localstorage.
    setCart(newCart);  // Update state variable.
    localStorage.setItem('cart',JSON.stringify(newCart)); // Store cart to localstorage.
  }

  // Callback function to empty cart.
  function emptyCart() {
    setCart([]);
    localStorage.removeItem('cart');
  }

  function search(phrase) {
    setCategory(null);
    setSearchPhrase(phrase);
  }
}

export default App;
