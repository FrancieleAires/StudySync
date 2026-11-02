import { Search, Bell } from 'lucide-react';

function Header({ titulo, temNotificacao = true }) {
    return (
        <header className="flex items-center justify-between px-5 pt-8 pb-6 md:px-8 md:pt-6">
            <h1 className="text-2xl font-bold text-[#4A2A63]">{titulo}</h1>

            <div className="flex items-center gap-4 text-[#7B3A9E]">
                <button type="button" aria-label="Buscar" className="hover:text-[#4A2A63] transition-colors">
                    <Search className="w-6 h-6 md:w-5 md:h-5" strokeWidth={2} />
                </button>
                <button type="button" aria-label="Notificações" className="relative hover:text-[#4A2A63] transition-colors">
                    <Bell className="w-6 h-6 md:w-5 md:h-5" strokeWidth={2} />
                    {temNotificacao && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#A56BC9] ring-2 ring-[#F5E9FA]" />
                    )}
                </button>
            </div>
        </header>
    );
}

export default Header;
