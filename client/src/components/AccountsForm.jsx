import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    createAccount,
    updateAccount
} from "../api/accounts.api";
import { toast } from "react-hot-toast";


// account:
// - null → estamos creando una cuenta
// - objeto → estamos editando una cuenta existente
//
// onClose:
// Función que recibe el componente padre para cerrar el modal.
//
// onSuccess:
// Función que recibe el componente padre para avisarle
// que la operación terminó correctamente.
export function AccountsForm({
    account,
    onClose,
    onSuccess
}) {

    const {
        register,
        handleSubmit,
        formState: { errors },

        // setValue permite establecer manualmente
        // el valor de un campo del formulario.
        setValue

    } = useForm();


    // Este efecto se ejecuta cuando cambia "account".
    //
    // Si account tiene una cuenta, significa que estamos editando,
    // por lo que cargamos sus datos dentro del formulario.
    //
    // Si account es null, estamos creando y no hacemos nada.
    useEffect(() => {

        if (account) {

            setValue("name", account.name);
            setValue("balance", account.balance);

        }

    }, [account, setValue]);


    // handleSubmit de React Hook Form valida el formulario
    // y luego ejecuta esta función con los datos.
    const onSubmit = handleSubmit(async (data) => {

        // Si existe "account", estamos editando.
        if (account) {

            // Utilizamos el ID de la cuenta seleccionada
            // para indicarle al backend qué cuenta actualizar.
            await updateAccount(account.id, data);

            toast.success("Account updated successfully", {
                position: "bottom-center"
            });

        } else {

            // Si no existe account, significa que estamos creando
            // una cuenta nueva.
            await createAccount(data);

            toast.success("Account created successfully", {
                position: "bottom-center"
            });
        }


        // Avisamos al componente padre que la operación
        // terminó correctamente.
        //
        // En nuestro caso esto hará que AccountsList
        // vuelva a cargar las cuentas.
        onSuccess();


        // Cerramos el modal después de guardar.
        onClose();

    });


    return (
        <form className="space-y-5" onSubmit={onSubmit}>

            {/* 
                El título cambia dependiendo de si estamos
                creando o editando.
            */}
            <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-white text">
                    {account ? "Editar Cuenta" : "Nueva Cuenta"}
                </h2>
            </div>

            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-zinc-200"
                >
                    Nombre
                </label>
                <input
                    type="text"
                    placeholder="Ej. BCP"

                    // register conecta este input con React Hook Form.
                    {...register("name", {
                        required: true
                    })}

                    className="w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-500"
                />

                {/* Mostramos el mensaje solamente si existe un error. */}
                {errors.name && (
                    <span>Name is required</span>
                )}
            
                <label
                    htmlFor="name"
                    className="mt-2 mb-2 block text-sm font-medium text-zinc-200"
                >
                    Balance
                </label>

                <input
                    type="number"
                    step="0.01"
                    placeholder="Ej. 1000.00"

                    {...register("balance", {
                        required: true
                    })}

                    className="w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-500"
                />

                {errors.balance && (
                    <span>Balance is required</span>
                )}
            </div>

            <div className="flex justify-center gap-4">

                {/* 
                    type="button" es importante.

                    Si no lo ponemos, el botón podría comportarse
                    como un botón submit del formulario.
                */}
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-zinc-600 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
                >
                    Cancelar
                </button>


                <button
                    type="submit"
                    className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    {/* 
                        El texto cambia dependiendo de la operación.
                    */}
                    {account ? "Actualizar" : "Crear Cuenta"}


                </button>

            </div>

        </form>
    );
}