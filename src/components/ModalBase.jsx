import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalBase = ({ title, content, footer, isClose, setIsModalVisible }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setIsModalVisible(false);
  }

  if (!show) return null;

  return (
    <div
      className="modal show"
      style={{ display: "flex", alignItems: "center", justifyContent: "center"}}
    >
      <Modal.Dialog>
        <Modal.Header closeButton={isClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{content}</Modal.Body>

        <Modal.Footer>
          {footer ?? <Button variant="secondary" onClick={handleClose}>Close</Button>}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ModalBase;