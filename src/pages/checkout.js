import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'

const containerStyle = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const checkout = ({ supabase }) => {
  const [purchasedItem, setPurchasedItem] = useState([]);
  const router = useRouter()

  useEffect(() => {
    setPurchasedItem(JSON.parse(localStorage.getItem("cart")));
  }, []);

  const onFinish = async (values) => {

    try {
      const newId = uuidv4();
      // Insert customer info in the form into orders table
      const { error } = await supabase
        .from("orders")
        .insert({
          id: newId,
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
        })
        .single();
      if (error) {
        console.log("Error inserting into orders:", error.message);
      }


      for (const item of purchasedItem) {
        const { id, quantity } = item;
        await supabase.from("order_items").insert({
          order_id: newId,
          product_id: id,
          quantity: quantity,
        });
      }


      // Clear the cart after successful order placement
      localStorage.removeItem("cart");
      alert("your order has been placed successfully")
      router.push('/products')


    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={containerStyle}>
      <div style={{ display: "block", width: "30rem" }}>
        <h1>Checkout Page</h1>
        <ul style={{ listStyle: "none" }}>
          {purchasedItem.map((item) => (
            <li key={item.id}>
              {`${item.name} - ${item.price}$ x ${item.quantity}`}
            </li>
          ))}
        </ul>
        <Form
          name="checkout-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              {
                type: "email",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default checkout;
