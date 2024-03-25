import { useRouter } from "next/router";
import AddTransactionModal from "@/components/modalButton";
import { useState } from "react";

export default function Buttons() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    // Função para abrir o modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex px-4 py-2 justify-center">
            <div className="m-4">
                <button
                    className="px-4 py-2 bg-blue-500  hover:bg-blue-600 text-white rounded focus:outline-none"
                    onClick={() => router.push('/')}
                   >Pagina Inicial</button>
            </div>
            <div className="m-4">
                <button
                    className="px-4 py-2 bg-blue-500  hover:bg-blue-600 text-white rounded focus:outline-none"
                    onClick={() => router.push('/gastos')}
                >
                    Gastos
                </button>
            </div>
            <div className="m-4">
                <button
                    className="px-4 py-2 bg-blue-500  hover:bg-blue-600 text-white rounded focus:outline-none"
                    onClick={handleOpenModal}>Adicionar Transação</button>
            </div>
            <div className="m-4">
                <AddTransactionModal show={showModal} handleClose={handleCloseModal} />
            </div>
        </div>
    );
};