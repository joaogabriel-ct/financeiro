import React, { useState } from 'react';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

const AddTransactionModal = ({ show, handleClose }) => {
  const [transactionType, setTransactionType] = useState('receita'); // Estado para controlar o tipo de transação

  // Estado para armazenar os valores dos campos de cada tipo de transação
  const [formData, setFormData] = useState({
    receita: { descricao: '', valor: '', data: '' },
    gastos: { categoria: '', descricao: '', valor: '', data: '', banco: '', parcelas: '', parcela_atual: '' }
  });

  const handleTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [transactionType]: { ...formData[transactionType], [name]: value } });
  };

  const handleSubmit = () => {
    // Lógica para lidar com o envio do formulário
    console.log('Formulário enviado:', formData[transactionType]);
    // Aqui você pode enviar os dados para o backend
    handleClose(); // Fechar o modal após enviar o formulário
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '500px', margin: 'auto', marginTop: '50px' }}>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel id="transactionType-label">Tipo de Transação</InputLabel>
          <Select
            labelId="transactionType-label"
            id="transactionType"
            value={transactionType}
            onChange={handleTypeChange}
            label="Tipo de Transação"
          >
            <MenuItem value="receita">Receita</MenuItem>
            <MenuItem value="gastos">Gastos</MenuItem>
          </Select>
        </FormControl>
        <form>
          {transactionType === 'receita' ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Descrição" name="descricao" value={formData.receita.descricao} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Valor" name="valor" value={formData.receita.valor} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth type="date" label="Data" name="data" value={formData.receita.data} onChange={handleInputChange} />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Categoria" name="categoria" value={formData.gastos.categoria} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="banco-label">Banco</InputLabel>
                    <Select
                      labelId="banco-label"
                      id="banco"
                      value={formData.gastos.banco}
                      onChange={handleInputChange}
                      label="Banco"
                      name="banco"
                    >
                      <MenuItem value="Banco A">Banco A</MenuItem>
                      <MenuItem value="Banco B">Banco B</MenuItem>
                      <MenuItem value="Banco C">Banco C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Parcelas" name="parcelas" value={formData.gastos.parcelas} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Parcela Atual" name="parcela_atual" value={formData.gastos.parcela_atual} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Descrição" name="descricao" value={formData.gastos.descricao} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Valor" name="valor" value={formData.gastos.valor} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth type="date" label="Data" name="data" value={formData.gastos.data} onChange={handleInputChange} />
                </Grid>
              </Grid>
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
            Salvar
          </Button>
          <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px', marginTop: '20px' }}>
            Fechar
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
