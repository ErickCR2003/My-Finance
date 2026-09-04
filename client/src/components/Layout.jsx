import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 md:flex">
            <Navigation />
            <main className="min-h-screen flex-1 p-5 md:p-10">
                <div className="mx-auto max-w-7xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
