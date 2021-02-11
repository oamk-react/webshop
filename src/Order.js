import React from 'react'

export default function Order({cart}) {
  let sum = 0;
  return (
    <div>
      <h3>Order items</h3>
      <table>
        <tbody>
          {cart.map(product => {
            sum+=parseFloat(product.price);
            return (
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            )
            })}
          <tr>
            <td></td>
            <td>{sum.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <form>
        <div>
          <label>
            First name:
          </label>
        </div>
      </form>
    </div>
  )
}
