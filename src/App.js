import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [productList, updateProductList] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/products', {
        name: newProductName,
        price: newProductPrice,
      })
      .then((resp) => {
        updateProductList([...productList, resp.data]);
      });
  };

  const handleNameChange = (e) => {
    setNewProductName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setNewProductPrice(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      updateProductList(response.data);
    });
  }, []);

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
