import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { columnsProduct,columnsOrder } from "../utils/staticData";
// import { supabase } from "../utils/supabase";
import AddNewProductModal from "../components/AddNewProductModal";
import StyledSidebar from "../components/StyleSidebar";
import { Layout } from "antd";

const { Content } = Layout;

const AdminDashboardPage = ({ supabase }) => {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // load products on initial page
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  async function fetchProducts() {
    let { data: products, error } = await supabase.from("products").select("*");
    if (error) console.log("Error fetching products:", error.message);
    else setProducts(products);
  }
  async function fetchOrders() {
    let { data: orders, error } = await supabase.from("orders").select("*");
    if (error) console.log("Error fetching orders:", error.message);
    else setOrders(orders);


  }
  function showModal() {
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  // Uploads image to Supabase Storage
  async function uploadImage(file) {
    const { data, error } = await supabase.storage
      .from("products")
      .upload(file.name, file);
    if (error) console.log("Error uploading image:", error.message);
    else {
      return data.path;
    }
  }

  //send new product data to server to create new product
  async function onCreate(newProductData) {
    setIsAdding(true);
    const { name, description, mainImage, subImages, price, promotionPrice } =
      newProductData;
    //upload all image first
    const mainImageKey = await uploadImage(mainImage[0].originFileObj);
    const subImageArray = subImages;
    let subImageKeys = [];
    if (subImageArray) {
      const subImageLength = subImageArray.length;
      subImageKeys = await Promise.all(
        [...Array(subImageLength)].map((_, i) =>
          uploadImage(subImageArray[i].originFileObj)
        )
      );
    }

    // add new product to the database
    let { data, error } = await supabase.from("products").insert({
      name: name,
      description: description,
      main_image: mainImageKey,
      sub_images: subImageKeys,
      price: price,
      promo_price: promotionPrice,
    });
    if (error) {
      console.log("Error adding product:", error.message);
      alert(error.message);
      setIsAdding(false);
    } else {
      alert("your new product created successfully");
      setIsAdding(false);
      // Reload the product data
      window.location.reload();
    }
  }
  function handleChangeTab(key) {
    setActiveTab(key);
  }

  const dashboardContent = (
    <Content>
      <h1>Admin Product Dashboard</h1>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Table
        dataSource={products}
        columns={columnsProduct}
        pagination={{ pageSize: 5 }}
      />

      <AddNewProductModal
        visible={isModalOpen}
        onCancel={hideModal}
        onCreate={onCreate}
        isAdding={isAdding}
      />
    </Content>
  );

  const ordersContent = (
    <Content>
      <h1>Admin Orders</h1>
      <Table
        dataSource={orders}
        columns={columnsOrder}
        pagination={{ pageSize: 10 }}
      />
    </Content>
  )

  return (
    <div style={{ height: "100vh" }}>
      <Layout style={{ height: "100%" }}>
        <StyledSidebar
          width={250}
          breakpoint="lg"
          collapsedWidth="0"
          changeTab={handleChangeTab}
          currentTab={activeTab}
        />
        <Layout>
          {/* <Content>
            <h1>Admin Product Dashboard</h1>
            <Button type="primary" onClick={showModal}>
              Add Product
            </Button>
            <Table
              dataSource={products}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />

            <AddNewProductModal
              visible={isModalOpen}
              onCancel={hideModal}
              onCreate={onCreate}
              isAdding={isAdding}
            />
          </Content> */}
          {
            activeTab === "dashboard"? dashboardContent : ordersContent
          }
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminDashboardPage;
