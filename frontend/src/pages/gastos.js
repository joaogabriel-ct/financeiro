import React, { useEffect, useState } from "react";
import axios from "axios";
import GastosTable from "@/components/tableGastos";

function Gastos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/gastos/")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div >
                <GastosTable salesData={data.transacoes} />
            </div>
        </div>
    );
}

export default Gastos;
