import React, {useState} from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const AddNewProductModal = ({ visible, onCancel, onCreate, isAdding }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  return (
    <>
      {
        <Modal
          open={visible}
          title="Add Product"
          onCancel={handleCancel}
          closable={true}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Submit
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter the product name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter the product description",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="mainImage"
              label="Main Image"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[
                {
                  required: true,
                  message: "Please upload the main product image",
                },
              ]}
            >
              <Upload>
                <Button icon={<PlusOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="subImages"
              label="Sub Images"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
            >
              <Upload>
                <Button icon={<PlusOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please enter the product price" },
              ]}
            >
              <InputNumber min={0} step={0.1} />
            </Form.Item>
            <Form.Item
              name="promotionPrice"
              label="Promotion Price"
              rules={[
                {
                  required: true,
                  message: "Please enter the product promotion price",
                },
              ]}
            >
              <InputNumber min={0} step={0.1} />
            </Form.Item>
          </Form>
          {isAdding? <p>Your new product is adding to database</p>: <></>}
        </Modal>
      }
      ;
    </>
  );
};

export default AddNewProductModal;
