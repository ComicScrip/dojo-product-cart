import { useState } from 'react';
import './App.css';
import uniqid from 'uniqid';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

function App() {
  const [productList, updateProductList] = useState(initialProductList);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: uniqid(),
      name: newProductName,
      price: newProductPrice,
      quantity: 1,
    };
    updateProductList([...productList, newProduct]);
  };

  const handleNameChange = (e) => {
    setNewProductName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setNewProductPrice(parseInt(e.target.value, 10));
  };

  return (
    <div className='App'>
      <h1>Ma commande !</h1>
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
          {productList.map(({ name, price, quantity, id }) => {
            return (
              <tr key={id}>
                <td>{name} </td>
                <td>{price} </td>
                <td>
                  <input
                    type='number'
                    value={quantity}
                    min='0'
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      const newProductList = productList.map((p) => {
                        if (id === p.id) {
                          return { ...p, quantity: newQuantity };
                        } else {
                          return p;
                        }
                      });
                      updateProductList(newProductList);
                    }}
                  />
                </td>
                <td>{price * quantity} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='total'>
        Montant total :{' '}
        {productList.reduce((sum, { price, quantity }) => {
          return sum + price * quantity;
        }, 0)}{' '}
        €
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='add-name'>
          Nom :{' '}
          <input
            type='text'
            id='add-name'
            required
            value={newProductName}
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor='add-price'>
          Prix :{' '}
          <input
            type='number'
            id='add-price'
            required
            min='0'
            value={newProductPrice}
            onChange={handlePriceChange}
          />
        </label>
        <button type='submit'> Ajouter produit </button>
      </form>
    </div>
  );
}

export default App;
