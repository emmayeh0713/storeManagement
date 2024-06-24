// src/Product.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productPage.css';

const Product = () => {
  const [products, setProducts] = useState([
    { name: '商品1', code: '123456', price: 100, cost: 50, stock: 50 },
    { name: '商品2', code: '789012', price: 150, cost: 80, stock: 30 },
    { name: '商品3', code: '345678', price: 200, cost: 100, stock: 20 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value
    });
  };

  const handleAddProduct = () => {
    setProducts([...products, currentProduct]);
    setCurrentProduct(null);
    setShowModal(false);
  };

  const handleEditProduct = (index) => {
    setCurrentProduct({ ...products[index], index });
    setShowModal(true);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((product, index) =>
      index === currentProduct.index ? currentProduct : product
    );
    setProducts(updatedProducts);
    setCurrentProduct(null);
    setShowModal(false);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="product">
      <h1>商品管理</h1>
      <button onClick={() => { setCurrentProduct({ name: '', code: '', price: '', cost: '', stock: '' }); setShowModal(true); }}>新增商品</button>
      <table>
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>條碼</th>
            <th>售價</th>
            <th>成本</th>
            <th>庫存</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.code}</td>
              <td>{product.price}</td>
              <td>{product.cost}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEditProduct(index)}>編輯</button>
                <button onClick={() => handleDeleteProduct(index)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{currentProduct.index !== undefined ? '編輯商品' : '新增商品'}</h2>
            <label>商品名稱:</label>
            <input type="text" name="name" value={currentProduct.name} onChange={handleChange} />
            <label>條碼:</label>
            <input type="text" name="code" value={currentProduct.code} onChange={handleChange} />
            <label>售價:</label>
            <input type="number" name="price" value={currentProduct.price} onChange={handleChange} />
            <label>成本:</label>
            <input type="number" name="cost" value={currentProduct.cost} onChange={handleChange} />
            <label>庫存:</label>
            <input type="number" name="stock" value={currentProduct.stock} onChange={handleChange} />
            <button onClick={currentProduct.index !== undefined ? handleUpdateProduct : handleAddProduct}>確認</button>
          </div>
        </div>
      )}

      <button  onClick={() => navigate('/dashboard')}>返回</button>
    </div>
  );
};

export default Product;
