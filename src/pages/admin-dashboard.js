import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { productData, columns } from "../utils/staticData";
import { supabase } from "../utils/supabase";
import AddNewProductModal from "../components/AddNewProductModal";

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // load products on initial page
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    let { data: products, error } = await supabase.from("products").select("*");
    if (error) console.log("Error fetching products:", error.message);
    else setProducts(products);
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

  return (
    <div>
      <h1>Admin Product Dashboard</h1>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      ;
      <AddNewProductModal
        visible={isModalOpen}
        onCancel={hideModal}
        onCreate={onCreate}
        isAdding={isAdding}
      />
    </div>
  );
};

export default AdminDashboardPage;
