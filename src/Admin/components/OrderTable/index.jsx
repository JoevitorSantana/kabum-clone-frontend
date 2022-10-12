import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import {clearErrors } from '../../../actions/ProductActions'
import {BsTrashFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import { EditProduct } from '../../pages/EditProduct';
import { toast, ToastContainer } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from '../../../constants/ProductConstants';
import { DELETE_USER_RESET } from '../../../constants/userConstants';
import { UpdateUser } from '../../pages/UpdateUser';
import { deleteOrder, getAllOrders } from '../../../actions/OrderActions';
import { DELETE_ORDER_RESET } from '../../../constants/orderConstants';
import axios from 'axios';



export function OrdersTable({history}){

    const dispatch = useDispatch();

    const { error, orders} = useSelector((state) => state.AllOrders);

    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            toast.success('Pedido deletado com sucesso');
            history.push('/adimin/orders');
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, history, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'status', headerName: 'Status', width: 250 },
        //{ field: 'Stock', headerName: 'Quant.', width: 130 },
        { field: 'user', headerName: 'Cliente', width: 250 },
        {
          field: 'itemsQty',
          headerName: 'Items',
          width: 100,
        },
        {
            field: 'amount',
            headerName: 'Valor',
            width: 100,
        },
        {
            field: "actions",    
            headerName: "Ações",        
            sortable: false,    
            renderCell: (params) => {
                return (
                  <>
                    <Link to={`/admin/edit/user/${params.getValue(params.id, "id")}`} style={{textDecoration: 'none', color: 'lightgreen'}} >                  
                        <AiFillEdit />
                    </Link>
        
                    <Button>
                        <BsTrashFill 
                            onClick={() =>
                            deleteOrderHandler(params.getValue(params.id, "id"))} 
                            color='red'/>
                    </Button>
                  </>
                );
            },    
        },
        
    ];

    {/*const getUserName = (userId) => {
        const userName = axios.get(`/api/v2/admin/users/${userId}`).then((response) => response.data.user).catch((error) => console.log(error))
        return userName;
    }*/} 

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                user: item.user,
                status: `${item.orderStatus === 'Shipped' ? 'Entregue' : 'Pendente'}`,
            });
    });    

    return(
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
                newsestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />                
        </>
    );
}