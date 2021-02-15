import React,{useState,useEffect} from 'react'

export default function Home({url,category, search, addToCart}) {
  const [products, setProducts] = useState([]);

  console.log(search);

  useEffect(() => {
    if (category !== null || search !== '') {
      let address = '';
      if (category !== null) {
        address = url + 'products/getproducts.php/' + category?.id;
      }
      else {
        address = url + 'products/search.php/' + search;
      }
      fetch(address)
      .then(res => res.json())
      .then (
        (res) => {
          setProducts(res);
        },(error)=> {
          alert(error);
        }
      )
    }

  }, [category,search]) // If category or search changes.

  return (
    <div>
      <h3>Products for {category?.name}</h3>
      {search &&
        <p>{search}</p>
      }
      {products.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <button className="btn btn-primary" type="button" onClick={e => addToCart(product)}>Add</button>
        </div>
      ))}

    </div>
  )
}
