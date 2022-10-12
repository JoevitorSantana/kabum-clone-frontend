import TextField from '@mui/material/TextField'

export function FormInput(props){
    return(
        <TextField 
            label={props.label} 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            variant="outlined"     
            color='warning'                                
            style={{
                ...props.style,
                marginBottom: '10px',
                background: 'white',                
            }}
        />
    )
};