import React,{useState,useEffect} from 'react'

export default function Home({url,category,addToCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category !== null) {
      const address = url + 'products/getproducts.php/' + category?.id;
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

  }, [category])

  return (
    <div>
      <h3>Products for {category?.name}</h3>
      {products.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <button className="btn btn-primary" type="button" onClick={e => addToCart(product)}>Add</button>
        </div>
      ))}

    </div>
  )
}
