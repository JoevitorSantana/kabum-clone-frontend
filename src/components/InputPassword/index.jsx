import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export function InputPassword(props) {

    const [values, setValues] = React.useState({        
        password: '',
        showPassword: false,
      });
    
      /*const handleChange =
        (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        };*/
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <FormControl variant='outlined' style={{marginBottom: '10px'}}>
            <InputLabel color='warning' style={{background: 'white', paddingRight: 5 }} htmlFor="outlined-adornment-password">{props.label}</InputLabel>
            <OutlinedInput
                //id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                color="warning"                
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Senha"
            />   
        </FormControl>
        
    )
}
