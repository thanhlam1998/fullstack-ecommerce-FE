import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";

const RatingModal = ({ children, handleRate }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  // Get the history
  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (user) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleOK = () => {
    handleRate();
    closeModal();
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-warning" /> <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={handleOK}
        onCancel={closeModal}>
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
