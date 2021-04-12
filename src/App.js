import { useState } from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

function App() {
  const [productList, setproductList] = useState(initialProductList);
  const cartTotal = productList.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  return (
    <div className='App'>
      <h1>Ma commande</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price} €</td>
                <td>{product.quantity}</td>
                <td>{product.price * product.quantity} €</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Total de la commande : <em>{cartTotal} €</em>
      </p>
    </div>
  );
}

export default App;
