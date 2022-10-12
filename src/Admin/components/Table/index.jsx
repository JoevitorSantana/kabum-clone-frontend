import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import {clearErrors, deleteProduct, getAdminProduct} from '../../../actions/ProductActions'
import {BsTrashFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import { EditProduct } from '../../pages/EditProduct';
import { toast, ToastContainer } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from '../../../constants/ProductConstants';
import { Loader } from '../../../components/Loader';


export function Table({history}){

    const dispatch = useDispatch();

    const deleteProductHandler = (id) => {        
        dispatch(deleteProduct(id));
    };    

    const { loading, error, products} = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.deleteProduct
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome do Produto', width: 400 },
        //{ field: 'Stock', headerName: 'Quant.', width: 130 },
        {
          field: 'price',
          headerName: 'Preço',
          type: 'number',
          width: 150,
        },
        {
            field: 'stock',
            headerName: 'Quantidade',
            type: 'number',
            width: 150,
        },
        {
            field: "actions",    
            headerName: "Ações",        
            sortable: false,    
            renderCell: (params) => {
                return (
                  <>
                    <Link to={`/admin/edit/product/${params.getValue(params.id, "id")}`} style={{textDecoration: 'none', color: 'lightgreen'}} >                  
                        <AiFillEdit />
                    </Link>
        
                    <Button>
                        <BsTrashFill 
                            onClick={() =>
                            deleteProductHandler(params.getValue(params.id, "id"))} 
                            color='red'/>
                    </Button>
                  </>
                );
            },    
        },
        
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: `${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price)}`,
                name: item.name,
            });
        });

    useEffect(() => {

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
          }
      
        if (isDeleted) {
            toast.success("Produto deletado com sucesso!");
            history.push("/admin/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct())
    }, [dispatch, error, history, deleteError, isDeleted])

    return(
        <>
            {loading ? (
                <Loader />
            ):(
                <>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
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
            )}                            
        </>
    );
}