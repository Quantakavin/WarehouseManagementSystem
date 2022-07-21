import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from "@mui/material/Button";
import './modal.css'

function ModalButton(){


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:400,
    opacity:1
   
  },
 
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)



  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
        <Button
            size="small"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#063970",
              width: 300,
              height: 50,
              borderRadius: 10,
            }}
            onClick={openModal}
          >
            Apply For Extension
          </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="TLoanExtension Modal"
      >
        <h2 style={{color: '#063970', display:"flex", justifyContent:"center",alignItems: 'center'}}>Extension For Loan</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );

}

export default ModalButton