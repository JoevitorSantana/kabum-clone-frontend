import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import styled from 'styled-components'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',  
  boxShadow: 24,
  p: 4,
};

export default function ModalFrete() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ModalTitle>
                <Text>
                    <h2>FRETE E PRAZO</h2>
                </Text>
            </ModalTitle>            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}



const Text = styled.div`
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 400;
    display: flex;
    align-self: baseline;
    flex-direction: column;
    padding: 0px;

    h2 {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        color: rgb(66, 70, 77);
        text-transform: uppercase;
        margin: 0px;
    }
`;

const ModalTitle = styled.div`
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    padding: 0px;
`;