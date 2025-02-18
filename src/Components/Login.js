import React from "react";
import { Form, Input, Button, Typography, Card, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://json-placeholder.mock.beeceptor.com/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Check the full response data
      console.log(response.data.success);
      if (response.data.success == true) {
        localStorage.setItem("token", response.data.token);
        enqueueSnackbar(response.data.message, {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/users");
        console.log(response.data.message);
      } else if (response.data.success == false) {
        enqueueSnackbar(response.data.error.message, { variant: "error" });
        console.log(response.data.error.message);
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      enqueueSnackbar(
        error.response?.data?.message || "An error occurred. Please try again.",
        { variant: "error" }
      );
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#e3e3e3" }}>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh", padding: "10px", display: "flex" }}
        >
          <Col xs={22} sm={20} md={16} lg={12} xl={8}>
            <Card
              style={{ width: "100%", padding: "20px", textAlign: "center" }}
            >
              <Typography.Title level={3} style={{ marginBottom: "20px" }}>
                Login
              </Typography.Title>
              <Form
                name="login-form"
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your username"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter your password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large">
                    Login
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Text>
                Don't have an account? <a href="">Sign up</a>
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
