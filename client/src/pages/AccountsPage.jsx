import { useState } from "react";
import { Link } from "react-router-dom";
import { AccountsList } from "../components/AccountsList";
import { Modal } from "../components/modal";
import { AccountsForm } from "../components/AccountsForm";
import { deleteAccount } from "../api/accounts.api";
import toast from "react-hot-toast";

export function AccountsPage() {

    // Indica si el modal está abierto o cerrado.
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Guarda la cuenta que queremos editar.
    // null significa que NO estamos editando ninguna cuenta.
    const [selectedAccount, setSelectedAccount] = useState(null);

    // Cambiar este valor hará que AccountsList
    // vuelva a cargar las cuentas.
    const [refresh, setRefresh] = useState(false);


    // -----------------------------------------
    // EDITAR
    // -----------------------------------------

    const handleEdit = (account) => {

        // Guardamos la cuenta seleccionada.
        setSelectedAccount(account);

        // Abrimos el modal.
        setIsModalOpen(true);
    };


    // -----------------------------------------
    // CREAR
    // -----------------------------------------

    const handleNewAccount = () => {

        // Nos aseguramos de que NO haya
        // una cuenta seleccionada.
        setSelectedAccount(null);

        // Abrimos el modal.
        setIsModalOpen(true);
    };


    // -----------------------------------------
    // ELIMINAR
    // -----------------------------------------

    const handleDelete = async (id) => {

        // Preguntamos antes de eliminar.
        const confirmed = window.confirm(
            "¿Estás seguro de que quieres eliminar esta cuenta?"
        );

        if (!confirmed) {
            return;
        }

        // Mandamos el ID al backend.
        await deleteAccount(id);

        toast.success("Cuenta eliminada correctamente", {
            position: "bottom-center"
        });

        // Avisamos a AccountsList que debe
        // volver a cargar las cuentas.
        setRefresh(prev => !prev);
    };


    // -----------------------------------------
    // CUANDO EL FORMULARIO TERMINA
    // -----------------------------------------

    const handleSuccess = () => {

        // Hacemos que AccountsList vuelva a
        // consultar las cuentas.
        setRefresh(prev => !prev);
    };


    return (
        <section className="space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        Cuentas
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Administra tus cuentas y saldos
                    </p>
                </div>

                <button
                    onClick={handleNewAccount}
                    className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    + Nueva cuenta
                </button>
            </header>


            <AccountsList
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <AccountsForm
                    account={selectedAccount}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSuccess}
                />

            </Modal>

        </section>
    );
}



