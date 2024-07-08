import Modal from "@/Components/utils/Modal";
import React, { useState } from "react";

function CreateCounselor() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>something</div>
      </Modal>
    </div>
  );
}

export default CreateCounselor;
