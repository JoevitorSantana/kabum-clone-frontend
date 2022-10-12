import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearErrors, createProduct } from "../../../actions/ProductActions";
import { NEW_PRODUCT_RESET } from "../../../constants/ProductConstants";
import { AdminHeader } from "../../components/Header";
import styled from 'styled-components';
import { FormInput } from "../../../components/FormInput";
import { DrawerNavigator } from "../../components/DrawerNavigator";
import loader from '../../../assets/loading.gif'
import { getUserDetails, updateUser } from "../../../actions/userActions";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";

export function CreateUser({history, match, params}){

    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = match.params.id;

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
            toast.success("Usuário atualizado com sucesso!");
            setTimeout(() => {
                history.push('/admin/users')
            }, 5000); 
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

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
            <AdminHeader/> 
            <Container>
                <Content>
                    <DrawerNavigator />
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
                                <Button type="submit">{loading ? <img style={{width: '150px', height: '150px'}}src={loader} alt="loader"/> : 'Atualizar Usuário'}</Button>
                            </FormContent>                        
                        </Form>    
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
                </Content>                              
            </Container>            
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

const Sizes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media(max-width: 850px){
        flex-wrap: wrap;
        max-width: 100%;
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin: 30px;    
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
    margin: 10px;
`;

const Content = styled.div`
    max-width: 1280px;
    width: 100%;    
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    background: #E5E5E5;
`;