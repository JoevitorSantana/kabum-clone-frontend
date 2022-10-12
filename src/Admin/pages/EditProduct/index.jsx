import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AiFillEdit } from 'react-icons/ai';
import styled from 'styled-components';
import { useState } from 'react';
import { FormInput } from '../../../components/FormInput';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, updateProduct } from '../../../actions/ProductActions';
import { toast, ToastContainer } from 'react-toastify';
import { UPDATE_PRODUCT_RESET } from '../../../constants/ProductConstants';
import loader from '../../../assets/loading.gif'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'scroll',   
    overflowX: 'hidden',    
    maxHeight: 500,
    display:'block',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',    
    boxShadow: 24,
    p: 4,
};

export function EditProduct({history, match, params}){

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { error, product } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [nVlPeso, setNVlPeso] = useState(0);
    const [nVlAltura, setNVlAltura] = useState(0);
    const [nVlComprimento, setNVlComprimento] = useState(0);
    const [nVlLargura, setNVlLargura] = useState(0);
    const [discountPrice, setOfferPrice] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Hardware",
        "Periféricos",
        "Games",
        "Computadores"
    ];

    const {
        loading,
        error: updateError,
        isUpdated,
      } = useSelector((state) => state.deleteProduct);

    const productId = params;    

    useEffect(() => {
        if (product && product._id !== productId) {
          dispatch(getProductDetails(productId));
        } else {
          setName(product.name);
          setDescription(product.description);
          setOfferPrice(product.discountPrice);
          setPrice(product.price);
          setCategory(product.category);
          setStock(product.Stock);
          setOldImages(product.images);
          setNVlAltura(product.nVlAltura);
          setNVlComprimento(product.nVlComprimento);
          setNVlPeso(product.nVlPeso);
          setNVlLargura(product.nVlLargura);
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
          toast.success("Produto atualizado com sucesso");
          history.push("/admin/products");
          dispatch({ type: UPDATE_PRODUCT_RESET });
        }
      }, [
        dispatch,        
        error,
        history,
        isUpdated,
        productId,
        product,
        updateError,
    ]);

    const updateProductSubmitHandler  = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("discountPrice", discountPrice);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        myForm.set("nVlPeso", nVlPeso);
        myForm.set("nVlAltura", nVlAltura);
        myForm.set("nVlComprimento", nVlComprimento);
        myForm.set("nVlLargura", nVlLargura);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
    };

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
                            onSubmit={updateProductSubmitHandler}
                    >
                            <FormContent>
                                <FormTitle>
                                    <h1>Atualizar Produtos</h1>
                                </FormTitle>
                                <FormInput label="Nome do Produto" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>                                                                               
                                    <FormInput
                                        type="number"
                                        label="Preço R$"
                                        name="price"         
                                        value={price}                           
                                        required                                    
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <FormInput
                                        type="String"
                                        label="Desconto(%)"
                                        value={discountPrice}
                                        onChange={(e) => setOfferPrice(e.target.value)}
                                    />
                                    <FormInput
                                        type="number"
                                        label="Quantidade"
                                        required
                                        value={Stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />                                                                           
                                    <FormInput
                                        type="number"
                                        label="Peso (Kg)"
                                        name="nVlPeso"
                                        required
                                        value={nVlPeso}
                                        onChange={(e) => setNVlPeso(e.target.value)}
                                    />
                                    <FormInput
                                        type="number"
                                        label="Comprimento (cm)"
                                        name="nVlComprimento"
                                        required
                                        value={nVlComprimento}
                                        onChange={(e) => setNVlComprimento(e.target.value)}
                                    />
                                    <FormInput
                                        type="number"
                                        label="Largura (cm)"
                                        name="nVlLargura"
                                        required
                                        value={nVlLargura}
                                        onChange={(e) => setNVlLargura(e.target.value)}
                                    />
                                    <FormInput
                                        type="number"
                                        label="Altura (cm)"
                                        name="nVlAltura"
                                        required
                                        value={nVlAltura}
                                        onChange={(e) => setNVlAltura(e.target.value)}
                                    />                                                   
                                <textarea
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Escolha uma Categoria</option>
                                    {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                    ))}
                                </select>
                                
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProductImagesChange}
                                    multiple
                                    className="inputFile"
                                />
                                {oldImages &&
                                    oldImages.map((image, index) => (
                                    <img key={index} src={image.url} style={{width: '50px', height: '50px'}} alt="Old Product Preview" />
                                ))}
                                {imagesPreview.map((image, index) => (
                                    <img className="loadedImage" key={index} src={image} alt="Product Preview" />
                                ))}
                                <ButtonSubmit type="submit">{loading ? <img style={{width: '150px', height: '150px'}}src={loader} alt="loader"/> : 'Atualizar Produto'}</ButtonSubmit>
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