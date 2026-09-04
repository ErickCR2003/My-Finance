import { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "../api/categories.api";
import { CategoriesList } from "../components/CategoriesList";
import { CategoryForm } from "../components/CategoryForm";
import { Modal } from "../components/modal";

export function CategoriesPage() {
    // Como se que las Categorias van a tener cambios; pueden ser mas o menos, uso el useState([]). 
    // Esto se hace pensando en que el estado del categories cambiara y poder crear una funcion en donde ingresamos este cambio al setCategories
    // Y sucedan 2 cosas. 1. Que la data se guarde en el categories y 2. Que se cambie el estado y se avise a React que debe renderiar otra vez.
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    async function loadCategories() {
        const { data } = await getAllCategories();
        setCategories(data);
    }

    function handleEditCategory(category) {
        setCategoryToEdit(category);
    }

    function handleDeleteCategory(category) {
        setCategoryToDelete(category);
    }

    async function confirmDeleteCategory() {
        try {
            await deleteCategory(categoryToDelete.id);
            setCategoryToDelete(null);
            await loadCategories();
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <section className="space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        Categorías
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Organiza tus ingresos y gastos
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    + Nueva categoría
                </button>
            </header>

            <CategoriesList
                categories={categories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
            />

            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
            >
                <CategoryForm
                    onSuccess={() => {
                        setShowForm(false);
                        loadCategories();
                    }}
                    onCancel={() => setShowForm(false)}
                />
            </Modal>

            <Modal
                isOpen={categoryToEdit !== null}
                onClose={() => setCategoryToEdit(null)}
            >
                <CategoryForm
                    category={categoryToEdit}
                    onSuccess={() => {
                        setCategoryToEdit(null);
                        loadCategories();
                    }}
                    onCancel={() => setCategoryToEdit(null)}
                />
            </Modal>

            <Modal
                // categoryToDelete es diferente de null? true or false...
                isOpen={categoryToDelete !== null}
                onClose={() => setCategoryToDelete(null)}
            >
                <div className="space-y-5">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Eliminar categoría
                        </h2>

                        <p className="mt-2 text-sm text-zinc-300">
                            ¿Estás seguro de que deseas eliminar la categoría{" "}
                            <span className="font-semibold text-white">
                                "{categoryToDelete?.name}"
                            </span>
                            ?
                        </p>

                        <p className="mt-2 text-sm text-zinc-400">
                            Los movimientos asociados no serán eliminados.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setCategoryToDelete(null)}
                            className="rounded-lg border border-zinc-600 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            onClick={confirmDeleteCategory}
                            className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}