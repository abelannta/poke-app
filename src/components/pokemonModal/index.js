import React from "react";
import { Modal } from "antd";

function PokemonModal({ openModal, setOpenModal, children }) {
  return (
    <Modal
      title="Vertically centered modal dialog"
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
    >
      {children}
    </Modal>
  );
}

export default PokemonModal;
