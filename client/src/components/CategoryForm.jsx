
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    createCategory,
    updateCategory,
} from "../api/categories.api";

export function CategoryForm({ category, onSuccess, onCancel }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
            });
        } else {
            reset({
                name: "",
            });
        }
    }, [category, reset]);


    async function saveCategory(data) {
        try {
            if (category) {
                await updateCategory(category.id, data);
            } else {
                await createCategory(data);
            }
            onSuccess();
        } catch (error) {
            console.error("Error al crear la categoría:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(saveCategory)} className="space-y-5">
            <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-white text">
                    {category ? "Editar categoría" : "Nueva categoría"}
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
                    id="name"
                    type="text"
                    placeholder="Ej. Alimentación"
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-700 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-500"
                    {...register("name", {
                        required: "El nombre es obligatorio.",
                        maxLength: {
                            value: 100,
                            message: "El nombre no puede superar los 100 caracteres.",
                        },
                    })}
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-rose-400">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-zinc-600 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting
                        ? "Guardando..."
                        : category
                            ? "Guardar cambios"
                            : "Crear categoría"
                    }
                </button>
            </div>
        </form>
    );
}