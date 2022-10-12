import * as React from 'react';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { AiFillCamera } from 'react-icons/ai';

export function UploadButtons(props){
    return(
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant='contained' style={{margin: 'auto 0 20px 0', width: '100%'}} color='warning' component="label">
                <AiFillCamera style={{margin: '0 10px'}} />
                Upload Avatar
                <input hidden name={props.name} accept={props.accept} multiple type={props.type} />
            </Button>
        </Stack>
    )
}