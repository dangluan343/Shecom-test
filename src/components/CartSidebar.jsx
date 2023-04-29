import { useState } from "react";
import { Drawer, List, Avatar, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Router from 'next/router';

const productBucketURL = process.env.NEXT_PUBLIC_SUPABASE_PRODUCTS_BUCKET_URL;

const CartSidebar = ({ cart }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    Router.push('/checkout');
  }

  return (
    <>
      <p style={{ textAlign: "right", padding: "0 2rem" }} onClick={showDrawer}>
        <ShoppingCartOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
        <span>({cart.length})</span>
      </p>
      <Drawer
        title="Your Cart"
        placement="right"
        closable={true}
        onClose={onClose}
        open={visible}
      >
        <div style={{ margin: "10px" }}>
          <List>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`${productBucketURL}${item.main_image}`} />
                    }
                    title={item.name}
                    description={`price: ${item.promo_price}$ quantity: ${item.quantity}`}
                  />
                </List.Item>
              ))
            )}
          </List>
          {cart.length === 0 ? <></>:<Button type="primary" onClick={handleClick}>Checkout</Button>}

        </div>
      </Drawer>
    </>
  );
};

export default CartSidebar;
