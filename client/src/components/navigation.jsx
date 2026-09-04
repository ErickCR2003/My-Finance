
import { NavLink } from "react-router-dom";

export function Navigation() {
    const navigationItems = [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Cuentas", to: "/accounts" },
        { label: "Movimientos", to: "/transactions" },
        { label: "Categorías", to: "/categories" },
    ];

    return (
        <aside className="border-b border-slate-200 bg-white md:min-h-screen md:w-64 md:border-r md:border-b-0">
            <div className="flex items-center justify-between px-5 py-5 md:px-7 md:py-8">
                <span className="text-medium font-semibold tracking-[0.2em] text-slate-900">
                    MYFINANCE
                </span>
            </div>

            <nav className="flex gap-2 overflow-x-auto px-3 pb-4 md:flex-col md:px-4">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
