import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SelectInput(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box style={{width: '100%', marginLeft: '5px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='warning'>{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          color='warning'
          style={{color: 'gray'}}
          value={age}
          label={props.label}
          onChange={handleChange}
        >
          <MenuItem value={props.totalPrice}>À Vista com 15% de desconto - {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.totalPrice)}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
