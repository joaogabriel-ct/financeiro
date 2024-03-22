import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "@/components/charts";


function Principal() {
    const [data, setData] = useState([]);
    const [receita, setReceita] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/gastos/")
            .then(response => {
                setData(response.data.transacoes);
                setReceita(response.data.receitas)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div>
                <ChartComponent salesData={data} revenueData={receita}/>
            </div>
        </div>
    );
}

export default Principal;