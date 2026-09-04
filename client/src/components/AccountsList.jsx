
import { useEffect, useState } from 'react';
import { getAllAccounts } from '../api/accounts.api';
import { AccountsCard } from './AccountsCard';

export function AccountsList({ refresh, onEdit, onDelete }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function loadAccounts() {
            const { data } = await getAllAccounts();
            setAccounts(data);
        }
        loadAccounts();
    }, [refresh]);

    return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {accounts.map(account => (
            <AccountsCard key={account.id} account={account} onEdit={onEdit} onDelete={onDelete} />
        ))}
    </div>
}