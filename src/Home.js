import React,{useState,useEffect} from 'react'

export default function Home({url,category, search, addToCart}) {
  const [products, setProducts] = useState([]);

  useEffect(async() => {
    if (category !== null || search !== '') {
      let address = '';
      if (category !== null) {
        address = url + 'products/getproducts.php/' + category?.id;
      }
      else {
        address = url + 'products/search.php/' + search;
      }

      try {
        const response = await fetch(address);
        const json = await response.json();
        if (response.ok) {
          setProducts(json);
        } else {
          alert(json.error);
        }
      } catch (error) {
        alert(error);
      }
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
          <div>
            <img src={url + 'images/' + product.image} alt="" />
          </div>
          <button className="btn btn-primary" type="button" onClick={e => addToCart(product)}>Add</button>
        </div>
      ))}

    </div>
  )
}
