import './App.css';
import {useState, useEffect, useCallback} from 'react'
import ProductCard from "./components/ProductCard";
import CreateProduct from "./components/CreateProduct";


function App() {
  const [products, setProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [createMode, setCreateMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('products')) {
      setProducts(JSON.parse(localStorage.getItem('products')))
    }
  }, [])

  useEffect(() => {
    setTotalPrice(products.reduce((acc,rec) => {return acc + (rec.price * rec.count)},0))
  }, [products])

  function addProduct(product, count) {
    if(isNaN(count) || count < 0 ) count = 0
    let newProductsList = products.map((el) => {
      if (el.id === product.id) {
        el.count = count
      }
      return el
    })
    localStorage.setItem('products', JSON.stringify(newProductsList))
    setProducts(newProductsList)
  }

  const createModeHandler = useCallback((isCreateMode) => {
    setCreateMode(isCreateMode)
  }, [])

  function deleteProduct (product) {
    let newProductsList = products.filter((el) => el.id !== product.id)
    localStorage.setItem('products', JSON.stringify(newProductsList))
    setProducts(newProductsList)
  }

  function editProduct (product) {
    if ((product.price && product.price >= 0) && product.name.length) {
      let newProductsList = products.map((el) => el.id === product.id ? product : el )
      localStorage.setItem('products', JSON.stringify(newProductsList))
      setProducts(newProductsList)
    }
  }

  return (
    <div className="product">
      <div className="product-header">
        <div className="product-header__name">Название</div>
        <div className="product-header__price">Цена</div>
        <div className="product-header__count">Количество</div>
      </div>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} addProduct={addProduct} deleteProduct={deleteProduct} editProduct={editProduct}/>
      ))}
      <div className="total__price">{totalPrice}$</div>
      <button className="product-create-toggle" onClick={() => createModeHandler(!createMode)}>Добавить новый продукт</button>
      {createMode && <CreateProduct createModeHandler={createModeHandler} products={products} setProducts={setProducts}/>}
    </div>
  );
}

export default App;
