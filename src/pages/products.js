import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import ProductCard from "../components/ProductCard";
import CartSidebar from '../components/CartSidebar'
const productsPage = ({ supabase }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])

  // load products on initial page
  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    let { data: products, error } = await supabase.from("products").select("*");
    if (error) console.log("Error fetching products:", error.message);
    else setProducts(products);

    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(initialCart);
  }

  const handleAddToCart = (newItem) => {
    if(cart.length === 0){
      setCart([newItem])
    }
    else {
      const newCart = [...cart];
      const isProductInCart = newCart.some(item => item.id === newItem.id);
      if(isProductInCart){
        newCart.forEach(item => {
          if(item.id === newItem.id){
            item.quantity = parseInt(item.quantity) + parseInt(newItem.quantity);
          }
        })
      }
      else {
        newCart.push(newItem);
      }
      setCart(newCart);
      
    }

  };

  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ textAlign: "center", padding: "3rem" }}>Products Page</h1>
      <CartSidebar cart={cart}/>

      <div style={{ padding: "1rem" }}>
        <Row gutter={[8, 24]}>
          {products.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default productsPage;
