import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

function App() {
  const [productList, setProductList] = useState(initialProductList);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);

  const cartTotal = productList.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  const handleNewProductNameChange = (event) => {
    setNewProductName(event.target.value);
  };

  const handleNewProductPriceChange = (event) => {
    setNewProductPrice(event.target.value);
  };

  const handleProductQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity === 0) {
      if (window.confirm('Etes vous sûr de vouloir supprimer cet item ?')) {
        setProductList((prevList) => prevList.filter((p) => p.id !== id));
      }
    } else {
      setProductList((prevList) =>
        prevList.map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
      );
    }
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    setProductList((prevList) => [
      ...prevList,
      {
        id: uuidv4(),
        name: newProductName,
        price: parseFloat(newProductPrice),
        quantity: 1,
      },
    ]);
  };

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
                <td>
                  <input
                    type='number'
                    min='0'
                    value={product.quantity}
                    onChange={(event) =>
                      handleProductQuantityChange(
                        product.id,
                        event.target.value
                      )
                    }
                  />
                </td>
                <td>{product.price * product.quantity} €</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Total de la commande : <em>{cartTotal} €</em>
      </p>
      <form onSubmit={handleAddProduct}>
        <h2>Ajouter un produit</h2>
        <label htmlFor='name'>
          Nom
          <input
            id='name'
            className='field'
            name='name'
            type='text'
            required
            onChange={handleNewProductNameChange}
            value={newProductName}
          />
        </label>
        <br />
        <label htmlFor='price'>
          Prix (€)
          <input
            className='field'
            id='price'
            name='price'
            type='number'
            required
            value={newProductPrice}
            onChange={handleNewProductPriceChange}
          />
        </label>
        <br />
        <br />

        <button type='submit'>Ajouter</button>
      </form>
    </div>
  );
}

export default App;
