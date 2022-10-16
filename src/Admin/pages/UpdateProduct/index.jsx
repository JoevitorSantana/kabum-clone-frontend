import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearErrors, getProductDetails, updateProduct } from "../../../actions/ProductActions";
import { UPDATE_PRODUCT_RESET } from "../../../constants/ProductConstants";
import { AdminHeader } from "../../components/Header";
import styled from 'styled-components';
import { FormInput } from "../../../components/FormInput";
import { DrawerNavigator } from "../../components/DrawerNavigator";
import loader from '../../../assets/loading.gif'

export function UpdateProduct({history, match}){

    const dispatch = useDispatch();

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

    const productId = match.params.id;    

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
          setTimeout(() => {
            history.push('/admin/products')
          }, 3000);
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
            <AdminHeader/> 
            <Container>
                <Content>
                    <DrawerNavigator />
                    <Form
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <FormContent>
                            <FormTitle>
                                <h1>Atualizar Produto</h1>
                            </FormTitle>
                            <FormInput label="Nome do Produto" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>                            
                            <Sizes>                                
                                <FormInput
                                    type="number"
                                    label="Preço R$"
                                    name="price"
                                    style={{width: '50%'}}
                                    required
                                    value={price}
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
                            </Sizes>                            
                            <Sizes>
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
                            </Sizes>                            
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
                            <div id="createProductFormImage">
                                {oldImages &&
                                    oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                    ))}
                            </div>
                            {imagesPreview.map((image, index) => (
                                <img className="loadedImage" key={index} src={image} alt="Product Preview" />
                            ))}
                            <Button type="submit">{loading ? <img style={{width: '150px', height: '150px'}}src={loader} alt="loader"/> : 'Atualizar Produto'}</Button>
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