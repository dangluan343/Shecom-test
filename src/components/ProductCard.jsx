import React, { useState } from "react";
import { Card, Button } from "antd";

const productBucketURL = process.env.NEXT_PUBLIC_SUPABASE_PRODUCTS_BUCKET_URL;

const flexBetweenStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: '1rem'
};
const twoLineStyle = {
  display: "-webkit-box",
  overflow: "hidden",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  margin: ".5rem 0",
  textOverflow: "hidden",
};

const ProductCard = ({ product, handleAddToCart }) => {
  const { Meta } = Card;
  const [quantity, setQuantity] = useState(1);
  const { description, name, main_image, price, promo_price } = product;
  const imageUrl = productBucketURL + main_image;

  function handleQuantityInput(e) {
    setQuantity(e.target.value);
  }

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          src={imageUrl}
          alt={name}
          style={{ height: "15rem", objectFit: "cover" }}
        />
      }
    >
      <Meta title={name} />
      <p style={twoLineStyle}>{description}</p>
      <p style={flexBetweenStyle}>
        <span style={{color:'red', textDecoration:'line-through'}}>${price}</span> <span>${promo_price}</span>
      </p>
      <div style={flexBetweenStyle}>
        <Button
          type="primary"
          onClick={() => handleAddToCart({ ...product, quantity: parseInt(quantity) })}
        >
          Add to Cart
        </Button>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={handleQuantityInput}
          style={{width: '100%', height: '100%'}}
          min={0}
        />
      </div>
    </Card>
  );
};

export default ProductCard;
