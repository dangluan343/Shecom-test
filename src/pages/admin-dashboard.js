import React, { useState } from "react";
import { Button, Input, Table, Modal } from "antd";
import { productData, columns } from "../utils/staticData";
import AddNewProductModal from "../components/AddNewProductModal";

const AdminDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function showModal() {
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  //send new product data to server to create new product
  function onCreate(newProductData) {
    console.log(newProductData);
    alert('your new product will be created');
  }


  return (
    <div>
      <h1>Admin Product Dashboard</h1>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Table dataSource={productData} columns={columns} />;
      <AddNewProductModal visible={isModalOpen} onCancel={hideModal} onCreate={onCreate}/>
    </div>
  );
};

export default AdminDashboardPage;
