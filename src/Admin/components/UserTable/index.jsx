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
import { deleteUser, getAllUsers } from '../../../actions/userActions';
import { UpdateUser } from '../../pages/UpdateUser';



export function UserTable({history}){

    const dispatch = useDispatch();

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };    

    const { error, users} = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome do Usuário', width: 250 },
        //{ field: 'Stock', headerName: 'Quant.', width: 130 },
        {
          field: 'email',
          headerName: 'E-mail',
          width: 300,
        },
        {
            field: 'role',
            headerName: 'Categoria',
            width: 150,
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
                            deleteUserHandler(params.getValue(params.id, "id"))} 
                            color='red'/>
                    </Button>
                  </>
                );
            },    
        },
        
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: `${item.role === 'admin' ? 'Administrador' : 'Cliente'}`
            });
        });

    useEffect(() => {

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
          }
      
        if (isDeleted) {
            toast.success("Usuário deletado com sucesso!");
            history.push("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers())
    }, [dispatch, error, history, deleteError, isDeleted])

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