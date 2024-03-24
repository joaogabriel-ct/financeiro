import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
  rows: {
    style: {
      minHeight: '72px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Columns = [
  {
    name: <a className='font-bold m-4'>{'Categoria'}</a>,
    selector: row => row.categoria,
    sortable: true,
    cell: row => <a className='m-4'>{row.categoria}</a>
  },
  {
    name: <a className='font-bold m-4'>{'Descrição'}</a>,
    selector: row => `${row.descricao}-${row.parcela_atual}/${row.parcelas}`,
    sortable: true,
    cell: row => <a className='m-4'>{`${row.descricao} - ${row.parcela_atual}/${row.parcelas}`}</a>
  },
  {
    name: <a className='font-bold m-4'>{'Data'}</a>,
    selector: row => formatDate(row.data),
    sortable: true,
    cell: row => <a className='m-4'>{formatDate(row.data)}</a>
  },
  {
    name: <a className='font-bold m-4'>{'Banco'}</a>,
    selector: row => row.banco,
    sortable: true,
    cell: row => (
      <a className='m-4'>{row.banco || 'Sem divida.'}</a>
    )
  },
  {
    name: <a className=' font-bold m-4'>{'Valor'}</a>,
    selector: row => parseFloat(row.valor), // Alterado para considerar valor numérico
    sortable: true,
    cell: row => <a className='m-4'>{`R$ ${parseFloat(row.valor).toFixed(2)}`}</a>
  }
];

const GastosTable = ({ salesData }) => {
  const [filterBank, setFilterBank] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      if (salesData) { // Check if salesData is not null or undefined
        const filteredData = salesData.filter((row) => {
          const bankMatch = filterBank ? (row.banco || '').toLowerCase().includes(filterBank.toLowerCase()) : true;
          const dateMatch = filterMonth ? new Date(row.data).getMonth() === parseInt(filterMonth, 10) : true;
          return bankMatch && dateMatch;
        });

        // Calcula a soma total dos valores filtrados
        const sum = filteredData.reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
        setTotalSum(sum);

        setFilteredData(filteredData);
      }
    };

    calculateTotals();
  }, [salesData, filterBank, filterMonth]);

  const handleFilterBankChange = (e) => {
    setFilterBank(e.target.value);
  };

  const handleFilterMonthChange = (e) => {
    setFilterMonth(e.target.value);
  };

  // Obtém uma lista de meses únicos dos dados de vendas
  const uniqueMonths = Array.from(new Set(salesData?.map(row => new Date(row.data).getMonth())));
  const monthOptions = uniqueMonths.map((month, index) => (
    <option key={index} value={month}>{new Date(0, month).toLocaleDateString('pt-BR', { month: 'long' })}</option>
  ));
  const CustomNoDataComponent = () => (
    <div className="text-center py-4">
      Verifique o seu filtro.
    </div>
  );

  return (
    <div className="justify-center items-center m-4">
      <h2 className=" text-4xl text-blue-600 font-bold text-center mb-4">
        Tabela de gastos mensais
      </h2>

      <div className="flex justify-center items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por banco..."
          value={filterBank}
          onChange={handleFilterBankChange}
          className="border text-black border-gray-300 rounded-md p-2"
        />
        <select
          value={filterMonth}
          onChange={handleFilterMonthChange}
          className="border text-black border-gray-300 rounded-md p-2"
        >
          <option value="">Selecione o mês</option>
          {monthOptions}
        </select>

        <p className="text-2xl font-bold">Valor Total:</p>
        <p className="text-2xl font-bold">R$ {totalSum.toFixed(2)}</p>
      </div>

      <div className='m-2'>
        <DataTable
          columns={Columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20, 25]}
          noDataComponent={<CustomNoDataComponent />}
        />
      </div>
    </div>
  );
};

export default GastosTable;
