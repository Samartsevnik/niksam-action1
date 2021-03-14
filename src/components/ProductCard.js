import React, {useState} from 'react'
import trash from '../assets/images/trash.png'
import edit from '../assets/images/edit.png'


const ProductCard = ({product, addProduct, deleteProduct, editProduct}) => {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  return (
    <div className="product-card">
      <button type="button" className="product-card__button edit"
              aria-labelledby="Edit product" title="Редактировать"
              onClick={() => {
                editMode && editProduct({...product, name, price})
                setEditMode(prev => !prev)
              }}
      >
        <img src={edit} alt="Edit"/>
      </button>
      <div className="product-card__name">
        {editMode ? <input type="text" aria-label="Enter new name" value={name}
                           onChange={(e) => setName(e.target.value)}/> : product.name}
      </div>
      <div className="product-card__price">
        {editMode ? <input type="text" aria-label="Enter new price" value={price}
                           onChange={(e) => setPrice(e.target.value)}/> : `${product.price}$`}
      </div>
      <div className="product-card__count">
        <input type="number" aria-label="product count"
               onFocus={({target}) => target.valueAsNumber === 0 && target.select()}
               min={0} className="count" defaultValue={product.count}
               onChange={({target: {valueAsNumber}}) => addProduct(product, valueAsNumber)}/>
      </div>
      <button type="button" aria-labelledby="Delete product" title="Удалить"
              className="product-card__button delete" onClick={() => deleteProduct(product)}>
        <img src={trash} alt="trash"/>
      </button>
    </div>
  );
}

export default React.memo(ProductCard);