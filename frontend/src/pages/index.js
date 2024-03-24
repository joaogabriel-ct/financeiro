import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "@/components/charts";
import Buttons from "@/components/buttons";


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
        <div className="container">
            <div className="col-md-6">
                <Buttons/>
            </div>
            <div className="col-md-6">

                <ChartComponent salesData={data} revenueData={receita}/>
            </div>
        </div>
    );
}

export default Principal;