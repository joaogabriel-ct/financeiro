import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ salesData, revenueData }) => {
    const [filterBank, setFilterBank] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [filteredRevenueData, setFilteredRevenueData] = useState([]);
    const [totalSalesSum, setTotalSalesSum] = useState(0);
    const [totalRevenueSum, setTotalRevenueSum] = useState(0);

    useEffect(() => {
        const calculateTotals = (data, setter, type) => {
            const filteredData = data.filter((row) => {
                let bankMatch = true;
                if (type === 'sales') {
                    bankMatch = filterBank ? (row.banco || '').toLowerCase().includes(filterBank.toLowerCase()) : true;
                }
                const dateMatch = filterMonth ? new Date(row.data).getMonth() === parseInt(filterMonth, 10) : true;
                return bankMatch && dateMatch;
            });

            const sum = filteredData.reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
            setter(sum);
            type === 'sales' ? setFilteredSalesData(filteredData) : setFilteredRevenueData(filteredData);
        };

        calculateTotals(salesData, setTotalSalesSum, 'sales');
        calculateTotals(revenueData, setTotalRevenueSum, 'revenue');
    }, [salesData, revenueData, filterBank, filterMonth]);

    useEffect(() => {
        const updateChart = (data, canvasId, label, type) => { // Adicionado o parâmetro "type" aqui
            const categories = {};
            data.forEach(row => {
                const categoryKey = type === 'sales' ? row.categoria : row.descricao;
                categories[categoryKey] = (categories[categoryKey] || 0) + parseFloat(row.valor);
            });

            const chartData = {
                labels: Object.keys(categories),
                datasets: [{
                    label,
                    data: Object.values(categories),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            const chartOptions = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };

            const ctx = document.getElementById(canvasId);
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }

            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
        };

        updateChart(filteredSalesData, 'salesChart', 'Gastos por Categoria', 'sales'); // Passando 'sales' como tipo
        updateChart(filteredRevenueData, 'revenueChart', 'Receitas por Descrição', 'revenue'); // Passando 'revenue' como tipo
    }, [filteredSalesData, filteredRevenueData]);

    const handleFilterBankChange = (e) => {
        setFilterBank(e.target.value);
    };

    const handleFilterMonthChange = (e) => {
        setFilterMonth(e.target.value);
    };

    const uniqueMonths = Array.from(new Set([...salesData, ...revenueData].map(row => new Date(row.data).getMonth())));
    const monthOptions = uniqueMonths.map((month, index) => (
        <option key={index} value={month}>{new Date(0, month).toLocaleDateString('pt-BR', { month: 'long' })}</option>
    ));

    return (
        <div className="justify-center items-center m-4">
            <div className="w-full md:w-1/2"> {/* Ocupa metade da tela em dispositivos maiores */}
                <h2 className="bg-white text-xl text-blue-600 font-bold text-center mb-4">
                    Gráfico de gastos
                </h2>

                <div className="flex space-x-4 mb-4">
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
                </div>
                <div className="flex space-x-4 mb-4">
                    <p className="text-2xl font-bold">Valor Total Gastos:</p>
                    <p className="text-2xl font-bold">R$ {totalSalesSum.toFixed(2)}</p>
                </div>

                <div className="mb-4 w-full h-1/4"> {/* Ocupa a largura total */}
                    <canvas id="salesChart"></canvas>
                </div>
            </div>

            <div className="w-full md:w-1/2"> {/* Ocupa metade da tela em dispositivos maiores */}
                <h2 className="bg-white text-xl text-blue-600 font-bold text-center mb-4">
                    Gráfico de receitas
                </h2>

                <div className="flex space-x-4 mb-4">
                    <p className="text-2xl font-bold">Valor Total Receitas:</p>
                    <p className="text-2xl font-bold">R$ {totalRevenueSum.toFixed(2)}</p>
                </div>

                <div className="mb-4 w-full h-1/4"> {/* Ocupa a largura total */}
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
