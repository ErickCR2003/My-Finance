import { useEffect, useState } from "react";
import { getAllAccounts } from "../api/accounts.api";
import { getDashboardSummary } from "../api/dashboard.api";
import { getRecentTransactions } from "../api/transactions.api";

function formatCurrency(value) {
    return new Intl.NumberFormat("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value));
}

function formatDate(date) {
    if (!date) {
        return "Fecha desconocida";
    }

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
}

export function DashboardPage() {
    const [accounts, setAccounts] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("all");
    const [accountsError, setAccountsError] = useState("");
    const [recentTransactionsError, setRecentTransactionsError] = useState("");
    const [summary, setSummary] = useState({
        balance: "0.00",
        income: "0.00",
        expense: "0.00",
    });
    const [summaryError, setSummaryError] = useState("");
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [recentTransactionsLoading, setRecentTransactionsLoading] = useState(true);

    const summaryCards = [
        {
            label: "Balance total",
            value: summary.balance,
            description: "Dinero disponible",
            valueClass: "text-slate-900",
        },
        {
            label: "Ingresos",
            value: summary.income,
            description: "Total recibido",
            valueClass: "text-emerald-600",
        },
        {
            label: "Gastos",
            value: summary.expense,
            description: "Total gastado",
            valueClass: "text-rose-600",
        },
    ];

    useEffect(() => {
        async function loadAccounts() {
            try {
                const { data } = await getAllAccounts();
                setAccounts(data);
                setAccountsError("");
            } catch {
                setAccountsError("No se pudieron cargar las cuentas.");
            }
        }

        loadAccounts();
    }, []);

    useEffect(() => {
        async function loadSummary() {
            setSummaryLoading(true);

            try {
                const accountId = selectedAccount === "all" ? null : selectedAccount;
                const { data } = await getDashboardSummary(accountId);
                setSummary(data);
                setSummaryError("");
            } catch {
                setSummary({ balance: "0.00", income: "0.00", expense: "0.00" });
                setSummaryError("No se pudo cargar el resumen financiero.");
            } finally {
                setSummaryLoading(false);
            }
        }

        loadSummary();
    }, [selectedAccount]);

    useEffect(() => {
        async function loadRecentTransactions() {
            setRecentTransactionsLoading(true);
            setRecentTransactionsError("");

            try {
                const { data } =
                    selectedAccount === "all"
                        ? await getRecentTransactions()
                        : await getRecentTransactions(selectedAccount);
                setRecentTransactions(data);
            } catch {
                setRecentTransactions([]);
                setRecentTransactionsError("No se pudieron cargar los últimos movimientos.");
            } finally {
                setRecentTransactionsLoading(false);
            }
        }

        loadRecentTransactions();
    }, [selectedAccount]);

    return (
        <section className="space-y-8">
            <header>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    Dashboard
                </h1>
                <p className="mt-2 text-slate-600">Resumen de tus finanzas</p>
            </header>

            <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <label
                    htmlFor="account"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Cuenta
                </label>
                <select
                    id="account"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    value={selectedAccount}
                    onChange={(event) => setSelectedAccount(event.target.value)}
                >
                    <option value="all">Todas las cuentas</option>
                    {accounts.map((account) => (
                        <option key={account.id} value={String(account.id)}>
                            {account.name}
                        </option>
                    ))}
                </select>
                {accountsError && <p className="mt-2 text-sm text-rose-600">{accountsError}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {summaryCards.map((card) => (
                    <article
                        key={card.label}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <p className="text-sm font-medium text-slate-500">
                            {card.label}
                        </p>

                        <p className={`mt-3 text-3xl font-bold tracking-tight ${card.valueClass}`}>
                            {summaryLoading ? "Cargando..." : `S/ ${formatCurrency(card.value)}`}
                        </p>

                        <p className="mt-2 text-sm text-slate-400">
                            {card.description}
                        </p>
                    </article>
                ))}
            </div>

            {summaryError && <p className="text-sm text-rose-600">{summaryError}</p>}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Últimos movimientos</h2>

                {recentTransactionsLoading ? (
                    <p className="mt-4 text-sm text-slate-500">Cargando movimientos...</p>
                ) : recentTransactionsError ? (
                    <p className="mt-4 text-sm text-rose-600">{recentTransactionsError}</p>
                ) : recentTransactions.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500">No hay movimientos recientes.</p>
                ) : (
                    <div className="mt-4 divide-y divide-slate-100">
                        {recentTransactions.map((transaction) => {
                            const accountName =
                                accounts.find((account) => account.id === transaction.account)?.name ??
                                "Cuenta desconocida";

                            return (
                                <article
                                    key={transaction.id}
                                    className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${transaction.type === "income"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-rose-50 text-rose-600"
                                                }`}
                                        >
                                            {transaction.type === "income" ? "+" : "-"}
                                        </div>

                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {transaction.description}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {formatDate(transaction.date)} · {accountName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:justify-end">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${transaction.type === "income"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-rose-50 text-rose-700"
                                                }`}
                                        >
                                            {transaction.type === "income" ? "Ingreso" : "Gasto"}
                                        </span>

                                        <span className="font-semibold text-slate-900">
                                            {transaction.type === "income" ? "+" : "-"} S/{" "}
                                            {formatCurrency(transaction.amount)}
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </section>
    );
}
