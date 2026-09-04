


export function Modal({ isOpen, onClose, children }) {
    // FALSE
    if (!isOpen) {
        return null;
    }

    // TRUE
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

            <div className="bg-zinc-800 p-6 rounded-lg w-96">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-white mb-1"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>

        </div>
    );
}