export function CategoryCard({ category, onEdit, onDelete }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md space-y-2 space-x-2">
            <h2 className="text-lg font-semibold text-slate-900">
                {category.name}
            </h2>
            <button
                type="button"
                onClick={() => onEdit(category)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
                <span>✎</span>
                Editar
            </button>
            <button
                    type="button"
                    onClick={() => onDelete(category)}
                    className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                >
                    Eliminar
                </button>
        </article>
    );
}