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
  Grid,
  Space,
  Typography,
} from "antd";
import { core_services } from "../../utils/api";

const { useBreakpoint } = Grid;
const { Text } = Typography;

interface Category {
  CategoryId: number;
  CategoryName: string;
  CategoryDesc: string;
}

const CategoryManagement: React.FC = () => {
  const screens = useBreakpoint();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [form] = Form.useForm();

  // ================= Fetch =================
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

  // ================= Submit =================
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingCategory) {
        await core_services.updateCategory(
          String(editingCategory.CategoryId),
          {
            categoryName: values.CategoryName,
            categoryDesc: values.CategoryDesc,
          }
        );
        message.success("Category updated");
      } else {
        await core_services.createCategory({
          categoryName: values.CategoryName,
          categoryDesc: values.CategoryDesc,
        });
        message.success("Category created");
      }

      handleClose();
      fetchCategories();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await core_services.deleteCategory(String(id));
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
        <Button
          type="primary"
          block={!screens.md}
          onClick={() => {
            form.resetFields();
            setEditingCategory(null);
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      }
    >
      {/* ================= Desktop ================= */}
      {screens.md && (
        <List
          loading={loading}
          bordered
          dataSource={categories}
          rowKey="CategoryId"
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => handleEdit(item)}>
                  Edit
                </Button>,
                <Popconfirm
                  title="Delete this category?"
                  onConfirm={() => handleDelete(item.CategoryId)}
                >
                  <Button danger size="small">
                    Delete
                  </Button>
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
      )}

      {/* ================= Mobile ================= */}
      {!screens.md && (
        <Space direction="vertical" style={{ width: "100%" }}>
          {categories.map((item) => (
            <Card
              key={item.CategoryId}
              loading={loading}
              style={{ width: "100%" }}
              title={item.CategoryName}
            >
              <Text type="secondary">
                {item.CategoryDesc || "No description"}
              </Text>

              <Space
                direction="vertical"
                style={{ width: "100%", marginTop: 16 }}
              >
                <Button block onClick={() => handleEdit(item)}>
                  Edit
                </Button>

                <Popconfirm
                  title="Delete this category?"
                  onConfirm={() => handleDelete(item.CategoryId)}
                >
                  <Button danger block>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Card>
          ))}
        </Space>
      )}

      {/* ================= Modal ================= */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={open}
        onOk={handleSubmit}
        onCancel={handleClose}
        okText={editingCategory ? "Update" : "Create"}
        width={screens.md ? 520 : "100%"}
        style={!screens.md ? { top: 0 } : undefined}
        bodyStyle={!screens.md ? { minHeight: "70vh" } : undefined}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Category Name"
            name="CategoryName"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Category Description" name="CategoryDesc">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CategoryManagement;
