import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createAccount, deleteAccount, updateAccount, getAccountById } from "../api/accounts.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function AccountsFormPage() {



    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateAccount(params.id, data);
            toast.success("Account updated successfully", { position: "bottom-center" });
        } else {
            await createAccount(data);
            toast.success("Account created successfully", { position: "bottom-center" });
        }
        navigate("/accounts");
    });

    useEffect(() => {
        async function loadAccount() {
            if (params.id) {
                const { data } = await getAccountById(params.id);
                setValue("name", data.name);
                setValue("balance", data.balance);
            }
        }
        loadAccount();
    }, [params.id]);

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    className="bg-zinc-700 text-white p-4 rounded-lg block w-full mb-3"
                />

                {errors.name && <span>Name is required</span>}

                <input
                    type="number"
                    step="0.01"
                    placeholder="Balance"
                    {...register("balance", { required: true })}
                    className="bg-zinc-700 text-white p-4 rounded-lg block w-full mb-3"
                />

                {errors.balance && <span>Balance is required</span>}

                <button className="bg-blue-500 text-white p-4 rounded-lg block w-full mb-3">
                    Save
                </button>
            </form>
            {
                params.id && (
                    <button className="bg-red-600 text-white p-4 rounded-lg block w-full mb-3" onClick={async () => {
                        const confirmDelete = window.confirm("Are you sure you want to delete this account?");
                        if (confirmDelete) {
                            await deleteAccount(params.id);
                            toast.success("Account deleted successfully", { position: "bottom-center" });
                            navigate("/accounts");
                        }
                    }}>
                        Delete
                    </button>
                )
            }

        </div>
    );
}