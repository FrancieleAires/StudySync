import { Search, Bell } from 'lucide-react';

function Header({ titulo, subtitulo, busca, onBuscar, temNotificacao = true }) {
    const labelNotificacao = temNotificacao
        ? 'Notificações (há novas notificações)'
        : 'Notificações';

    return (
        <header className="flex items-center justify-between px-5 pt-8 pb-6 md:px-8 md:pt-6">
            <div>
                <h1 className="text-2xl font-bold text-[#4A2A63]">{titulo}</h1>
                {subtitulo && (
                    <p className="mt-0.5 text-xs text-[#A56BC9]">{subtitulo}</p>
                )}
            </div>

            {onBuscar !== undefined ? (
                <>
                    <div
                        role="search"
                        className="hidden md:flex items-center bg-white rounded-2xl border border-[#EDE4F3] px-3.5 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#6B2C91]"
                    >
                        <Search className="w-4 h-4 text-[#A56BC9] shrink-0" aria-hidden="true" />
                        <input
                            type="search"
                            value={busca}
                            onChange={(e) => onBuscar(e.target.value)}
                            aria-label="Buscar tarefas"
                            placeholder="Buscar tarefas..."
                            className="w-56 pl-2.5 pr-3 text-xs text-[#4A2A63] placeholder-[#B48DCC] focus:outline-none bg-transparent"
                        />
                        <div className="h-4 w-px bg-[#EDE4F3] mx-1" aria-hidden="true" />
                        <button
                            type="button"
                            aria-label={labelNotificacao}
                            title={labelNotificacao}
                            className="relative pl-2 rounded text-[#A56BC9] hover:text-[#6B2C91] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91]"
                        >
                            <Bell className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                            {temNotificacao && (
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-0.5 right-0 w-2 h-2 rounded-full bg-[#A56BC9] ring-2 ring-white"
                                />
                            )}
                        </button>
                    </div>

                    <div className="flex md:hidden items-center gap-4 text-[#7B3A9E]">
                        <button
                            type="button"
                            aria-label="Buscar tarefas"
                            title="Buscar tarefas"
                            className="rounded-lg p-1 hover:text-[#4A2A63] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91]"
                        >
                            <Search className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            aria-label={labelNotificacao}
                            title={labelNotificacao}
                            className="relative rounded-lg p-1 hover:text-[#4A2A63] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91]"
                        >
                            <Bell className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
                            {temNotificacao && (
                                <span
                                    aria-hidden="true"
                                    className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#A56BC9] ring-2 ring-[#F5E9FA]"
                                />
                            )}
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center gap-4 text-[#7B3A9E]">
                    <button
                        type="button"
                        aria-label="Buscar"
                        title="Buscar"
                        className="rounded-lg p-1 hover:text-[#4A2A63] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91]"
                    >
                        <Search className="w-6 h-6 md:w-5 md:h-5" strokeWidth={2} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        aria-label={labelNotificacao}
                        title={labelNotificacao}
                        className="relative rounded-lg p-1 hover:text-[#4A2A63] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91]"
                    >
                        <Bell className="w-6 h-6 md:w-5 md:h-5" strokeWidth={2} aria-hidden="true" />
                        {temNotificacao && (
                            <span
                                aria-hidden="true"
                                className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#A56BC9] ring-2 ring-[#F5E9FA]"
                            />
                        )}
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;