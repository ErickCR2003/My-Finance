
export function AccountsCard({ account, onEdit, onDelete }) {
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900"> {account.name} </h2>
            <p className="mt-2 text-slate-600"> Balance: S/ {account.balance} </p>
            <div className="mt-4 flex gap-2">
                <button onClick={() => onEdit(account)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50" > Editar </button>
                <button onClick={() => onDelete(account.id)} className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50" > Eliminar </button>
            </div>
        </article>
    );
}