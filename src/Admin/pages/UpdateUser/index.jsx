import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AiFillEdit } from 'react-icons/ai';
import styled from 'styled-components';
import { useState } from 'react';
import { FormInput } from '../../../components/FormInput';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../../actions/ProductActions';
import { toast, ToastContainer } from 'react-toastify';
import { UPDATE_USER_RESET } from '../../../constants/userConstants';
// import loader from '../../../assets/loading.gif'
import { getUserDetails, updateUser } from '../../../actions/userActions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: 500,
    display:'block',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',    
    boxShadow: 24,
    p: 4,
};

export function UpdateUser({history, match, params}){

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // eslint-disable-next-line
    const { loading, error, user } = useSelector((state) => state.userDetails);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    

    const {
        error: updateError,
        isUpdated,
      } = useSelector((state) => state.profile);

    const userId = params;    

    useEffect(() => {
        if (user && user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
          toast.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          toast.success("Usuário atualizado com sucesso");
          history.push("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
        }
      }, [
        dispatch,        
        error,
        history,
        isUpdated,
        userId,        
        updateError,
        user
    ]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
    
        dispatch(updateUser(userId, myForm));
      };
    
    const categories = [
        {
            name: 'Administrador',
            value: 'admin'
        },
        {
            name: 'Cliente',
            value: 'user'
        }
    ]

    return(
        <>
            <div>
            <AiFillEdit onClick={handleOpen}/>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>                
                    <Form
                            encType="multipart/form-data"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <FormContent>
                                <FormTitle>
                                    <h1>Atualizar Usuário</h1>
                                </FormTitle>
                                <FormInput label="Nome" type="text" name="name"  onChange={(e) => setName(e.target.value)} value={name}/>
                                <FormInput label="E-mail" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                <select onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Escolha uma Categoria</option>
                                    {categories.map((cate) => (
                                    <option key={cate} value={cate.value}>
                                        {cate.name}
                                    </option>
                                    ))}
                                </select>
                                <ButtonSubmit type="submit">Atualizar Usuário</ButtonSubmit>
                            </FormContent>                        
                        </Form>  
                    </Box>
                </Modal>
            </div>
            <ToastContainer 
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}


const ButtonSubmit = styled.button`
    background: #FF6500;
    color: #fff;
    height: 50px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
`;

const FormTitle = styled.div`
    margin: 20px 0;
    h1{
        font-size: 20px;
        font-weight: 700;      
    }
`;

const FormContent = styled.div`
    display: flex;    
    flex-direction: column;

    .loadedImage{
        width: 100px;
        height: 100px;
    }

    textarea{
        border: 1px solid lightgrey;
        height: 50px;
        outlined: none;   
        border-radius: 5px;  
        padding: 5px;
    }

    select{
        margin: 10px 0;
        border: 1px solid lightgrey;
        height: 50px;
        border-radius: 5px;  
        outlined: none;      
    }

    .inputFile{
        margin: 20px 0;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    width: 100%;
    margin: 10px auto;
`;