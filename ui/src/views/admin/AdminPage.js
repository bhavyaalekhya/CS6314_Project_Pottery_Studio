import React, { useState, useEffect } from 'react';

// Non-editable Product card
const ProductDesc = function ({productInfo, buttonFunc}) {
  return (
    <div>
      <p>Name: {productInfo.name}</p>
      <p>Desc: {productInfo.description}</p>
      <p>Type: {productInfo.type}</p>
      <p>Count: {productInfo.count}</p>
      <p>Image Path: {productInfo.image.path}</p>
      <p>Image Desc: {productInfo.image.description}</p>
      <button onClick={buttonFunc}>Edit</button>
    </div>
  );
}

// Editable Product Card
const ProductForm = function ({productInfo, buttonFunc, submitFunc}) {
  // Hook to keep track of the form contents
  const [productData, setProductData] = useState({
    name: productInfo.name,
    description: productInfo.description,
    type: productInfo.type,
    count: productInfo.count,
    imgPath: productInfo.image.path,
    imgDescription: productInfo.image.description,
  });

  // Allows updates to the form fields
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Updates the product on form submission
  const formSubmit = async () => {
    try {
      // Try to update the product with the given ID
      const response = await fetch('http://localhost:5000/dashboard/' + productInfo._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      // If the update is successful, update the Product card with the updated info
      if (response.ok) {
        // Log the success
        console.log('Product data updated successfully!');

        // Create the new product info object
        let newProductInfo = 
        {
          productID: productInfo.productId,
          name: productData.name,
          description: productData.description,
          type: productData.type,
          count: productData.count,
          image:
          { path: productData.imgPath,
            description: productData.imgDescription}
        }

        // Update the product info
        submitFunc(newProductInfo);

        // Switch back to non-editable mode
        buttonFunc();
      } else { // Otherwise, log the failure and switch back to non-editable mode
        console.error('Failed to update product data');
        buttonFunc();
      }
    } catch (error) { // Log the error if something crashes along the way
      console.error('Error:', error);
    }
  }

  // Displays the product form
  return (
    <div>
      <form>
        <label for="name">Name: </label>
        <input type="text" id="name" name="name"
          value={productData.name} onChange={handleChange} required />
        <label for="description">Desc: </label>
        <input type="text" id="description" name="description"
          value={productData.description} onChange={handleChange} required />
        <label for="type">Type: </label>
        <input type="text" id="type" name="type"
          value={productData.type} onChange={handleChange} required />
        <label for="count">Count: </label>
        <input type="text" id="count" name="count"
          value={productData.count} onChange={handleChange} required />
        <label for="imgPath">Image Path: </label>
        <input type="text" id="imgPath" name="imgPath"
          value={productData.imgPath} onChange={handleChange} required />
        <label for="imgDescription">Image Desc: </label>
        <input type="text" id="imgDescription" name="imgDescription"
          value={productData.imgDescription} onChange={handleChange} required />
        <button onClick={formSubmit}>Save</button>
        <button onClick={buttonFunc}>Cancel</button>
      </form>
    </div>
  );
}

// Stores and edits the information for each Product
const Product = function ({productObj}) {
  // Keeps track of when each product card should be editable
  const [editEnabled, setEditable] = useState(false);

  // Toggles the editable state
  const toggleEditable = () => {
    setEditable(!editEnabled);
  }

  // Keeps track of the product information
  const [productInfo, setProductInfo] = useState(productObj);

  // Updates the card product info
  const updateCard = (newProductInfo) => {
    setProductInfo(newProductInfo);
  }

  // Displays the product card
  if (!editEnabled)
  {
    return <ProductDesc productInfo={productInfo} buttonFunc={toggleEditable} />
  }
  else
  {
    return <ProductForm productInfo={productInfo} buttonFunc={toggleEditable} submitFunc={updateCard} />
  }
};

function AdminPage() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory from MongoDB
    fetch('http://localhost:5000/dashboard')
    .then((response) => response.json())
    .then((data) => {
      setInventory(data);
    });
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      {inventory.map(product =>
        <Product productObj={product}/>
      )}
    </div>
  );
}

export default AdminPage;