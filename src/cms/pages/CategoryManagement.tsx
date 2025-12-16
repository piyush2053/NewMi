import React, { useEffect, useState } from "react";
import { Card, List, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { core_services } from "../../utils/api";

interface Category {
  id: string;
  categoryName: string;
  categoryDesc: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await core_services.getCategories();
      setCategories(res);
    } catch (err) {
      message.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await core_services.createCategory(values);
      message.success("Category created");
      setOpen(false);
      form.resetFields();
      fetchCategories();
    } catch (err) {
      message.error("Failed to create category");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await core_services.deleteCategory(id);
      message.success("Category deleted");
      fetchCategories();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  return (
    <Card
      title="Category Management"
      extra={<Button type="primary" onClick={() => setOpen(true)}>Add Category</Button>}
    >
      <List
        loading={loading}
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this category?"
                onConfirm={() => handleDelete(item.id)}
              >
                <Button danger size="small">Delete</Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={item.categoryName}
              description={item.categoryDesc}
            />
          </List.Item>
        )}
      />

      <Modal
        title="Add Category"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category Description"
            name="categoryDesc"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CategoryManagement;
