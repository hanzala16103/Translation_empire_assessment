import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Modal, Typography, Avatar } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("https://json-placeholder.mock.beeceptor.com/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [navigate]);

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Title
        level={2}
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
          padding: "20px",
          background: "linear-gradient(45deg,rgb(34, 54, 73), #2f54eb)",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: "1px",
        }}
      >
        Users List
      </Title>
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {users.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
              <Card
                hoverable
                onClick={() => showUserDetails(user)}
                style={{ width: "100%" }}
                cover={<Avatar src={user.photo || ""} size={64} />}
              >
                <Card.Meta
                  title={user.name}
                  description={`${user.company} - ${user.email}`}
                />
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => showUserDetails(user)}
                >
                  View Details
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          title={`${selectedUser?.name}'s Details`}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedUser && (
            <>
              <Avatar src={selectedUser.photo || ""} size={128} />
              <Title level={4} style={{ marginTop: "20px" }}>
                {selectedUser.name}
              </Title>
              <Text strong>Email: </Text>
              <Text>{selectedUser.email}</Text>
              <br />
              <Text strong>Phone: </Text>
              <Text>{selectedUser.phone}</Text>
              <br />
              <Text strong>Address: </Text>
              <Text>
                {selectedUser.address}, {selectedUser.zip}, {selectedUser.state}
                , {selectedUser.country}
              </Text>
              <br />
              <Text strong>Company: </Text>
              <Text>{selectedUser.company}</Text>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Users;
