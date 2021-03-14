import {useState} from 'react'
import WarningText from "./WarningText";

const CreateProduct = ({createModeHandler, products, setProducts}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [isValidPrice, setIsValidPrice] = useState(true)
  const [isValidName, setIsValidName] = useState(true)

  function createProduct(name, price) {
    if ((price && price >= 0) && name.length) {
      const id = products[products.length - 1] ? products[products.length - 1].id + 1 : 0
      let newProductsList = [...products, {id, name, price, count: 0}]
      localStorage.setItem('products', JSON.stringify(newProductsList))
      setProducts(newProductsList)
      createModeHandler(false)
    }
    setIsValidPrice((price && price >= 0))
    setIsValidName(!!name.length)
  }


  return (
    <div className="product-create">
      <h3>Создание нового продукта</h3>
      <label className="product-create__name">
        Название
        <input type="text" aria-label="product name" placeholder="Enter product name"
               value={name} onChange={({target}) => setName(target.value)}/>
      </label>
      {isValidName || <WarningText text="Введите название"/>}
      <label className="product-create__price">
        Цена
        <input type="text" aria-label="product price" placeholder="Enter product price"
               value={price} onChange={({target}) => setPrice(target.value)}
               onFocus={(e) => e.target.select()}
               onKeyUp={(e) => {
                 if (e.key === 'Enter') {
                   createProduct(name, +price)
                 }
               }}/>
      </label>
      {isValidPrice || <WarningText text="Введите верную стоимость"/>}
      <div className="product-create__buttons">
        <button type="button" className="product-create__button confirm" aria-labelledby="Confirm create"
                onClick={() => createProduct(name, +price)}>&#10003;</button>
        <button type="button" className="product-create__button cancel" aria-labelledby="Cancel create"
                onClick={() => createModeHandler(false)}>&#10005;</button>
      </div>
    </div>
  );
}

export default CreateProduct;