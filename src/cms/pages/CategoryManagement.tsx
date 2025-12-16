import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import { core_services } from "../../utils/api";

interface Category {
  CategoryId: number;
  CategoryName: string;
  CategoryDesc: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await core_services.getCategories();
      setCategories(res);
    } catch {
      message.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE or UPDATE
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingCategory) {
        // UPDATE
        await core_services.updateCategory(
          String(editingCategory.CategoryId),
          {
            categoryName: values.CategoryName,
            categoryDesc: values.CategoryDesc,
          }
        );
        message.success("Category updated");
      } else {
        // CREATE
        await core_services.createCategory({
          categoryName: values.CategoryName,
          categoryDesc: values.CategoryDesc,
        });
        message.success("Category created");
      }

      setOpen(false);
      setEditingCategory(null);
      form.resetFields();
      fetchCategories();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
    form.setFieldsValue({
      CategoryName: category.CategoryName,
      CategoryDesc: category.CategoryDesc,
    });
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await core_services.deleteCategory(String(categoryId));
      message.success("Category deleted");
      fetchCategories();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  return (
    <Card
      title="Category Management"
      extra={
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Category
        </Button>
      }
    >
      <List
        loading={loading}
        bordered
        dataSource={categories}
        rowKey="CategoryId"
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button color="orange" size="small" onClick={() => handleEdit(item)} >
                Edit
              </Button>,
              <Popconfirm
                title="Delete this category?"
                onConfirm={() => handleDelete(item.CategoryId)}
              >
                <Button danger size="small">Delete</Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={item.CategoryName}
              description={item.CategoryDesc}
            />
          </List.Item>
        )}
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit}
        okText={editingCategory ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="CategoryName"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category Description"
            name="CategoryDesc"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CategoryManagement;
