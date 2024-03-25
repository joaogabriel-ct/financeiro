import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const AddTransactionModal = ({ show, handleClose }) => {
  const [transactionType, setTransactionType] = useState('receita');
  const [formData, setFormData] = useState({
    receita: { descricao: '', valor: '', data: '' },
    gastos: { categoria: '', descricao: '', valor: '', data: '', banco: '', parcelas: '', parcela_atual: '' }
  });
  const [bancos, setBancos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/banco/');
        setBancos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os bancos:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categoria/');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar as categorias:', error);
      }
    };

    fetchBancos();
    fetchCategorias();
  }, []);

  const handleTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [transactionType]: { ...formData[transactionType], [name]: value } });
  };

  const handleSubmitReceita = async () => {
    try {
      await axios.post('http://localhost:8000/receita/', formData.receita);
      console.log('Receita enviada com sucesso!');
      handleClose();
    } catch (error) {
      console.error('Erro ao enviar receita:', error);
    }
  };

  const handleSubmitGastos = async () => {
    try {
      await axios.post('http://localhost:8000/gastos/', formData.gastos);
      console.log('Gastos enviados com sucesso!');
      handleClose();
    } catch (error) {
      console.error('Erro ao enviar gastos:', error);
    }
  };

  const handleSubmit = () => {
    if (transactionType === 'receita') {
      handleSubmitReceita();
    } else {
      handleSubmitGastos();
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Adicionar Transação</DialogTitle>
      <DialogContent>
        <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">Tipo de Transação</label>
        <select
          id="transactionType"
          name="transactionType"
          value={transactionType}
          onChange={handleTypeChange}
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="receita">Receita</option>
          <option value="gastos">Gastos</option>
        </select>
        {transactionType === 'receita' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input type='text' placeholder="Descrição" name="descricao" value={formData.receita.descricao} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type='text' placeholder="Valor" name="valor" value={formData.receita.valor} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type="date" placeholder="Data" name="data" value={formData.receita.data} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <select id="categoria" name="categoria" value={formData.gastos.categoria} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                ))}
              </select>

              <select id="banco" name="banco" value={formData.gastos.banco} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Banco</option>
                {bancos.map((banco) => (
                  <option key={banco.id} value={banco.id}>{banco.nome}</option>
                ))}
              </select>
              <input type='text' placeholder="Parcelas" name="parcelas" value={formData.gastos.parcelas} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type='text' placeholder="Parcela Atual" name="parcela_atual" value={formData.gastos.parcela_atual} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type='text' placeholder="Descrição" name="descricao" value={formData.gastos.descricao} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type='text' placeholder="Valor" name="valor" value={formData.gastos.valor} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type="date" placeholder="Data" name="data" value={formData.gastos.data} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
        <Button onClick={handleClose} color="secondary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionModal;
