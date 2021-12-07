import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const LessonModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="button--card" type="primary" onClick={showModal}>
        Meer info
      </Button>
      <Modal title={props.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
             footer={[]}>
            <p>{props.peopleAtended}/{props.totalStudents} leerlingen aanwezig</p>
            <p>{Math.round(props.peopleAtended/props.totalStudents*100)}%</p>
      </Modal>
    </>
  );
};

export default LessonModal;