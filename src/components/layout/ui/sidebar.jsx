import { NavLink } from 'react-router-dom';
import { BookOpen, CirclePlus, House, SquareCheckBig, CalendarDays } from 'lucide-react';

const itens = [
    { rota: '/dashboard', label: 'Dashboard', Icone: House },
    { rota: '/tasks', label: 'Tarefas', Icone: SquareCheckBig },
    { rota: '/calendar', label: 'Calendário', Icone: CalendarDays },
];

function Sidebar({ onAdicionar, usuario }) {
    return (
        <aside
            aria-label="Barra lateral"
            className="hidden md:flex fixed inset-y-0 left-0 z-40 w-56 flex-col bg-white border-r border-[#EDE4F3] px-3 py-5"
        >
            <div className="flex items-center gap-3 px-2 mb-8">
                <div
                    aria-hidden="true"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#7B3A9E] text-white"
                >
                    <BookOpen className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <span className="text-xl font-bold text-[#4A2A63]">
                    Study<span className="text-[#A56BC9]">Sync</span>
                </span>
            </div>

            <button
                type="button"
                onClick={onAdicionar}
                aria-label="Adicionar nova tarefa"
                title="Adicionar nova tarefa"
                aria-haspopup="dialog"
                className="flex items-center justify-center gap-2 w-full h-12 mb-8 rounded-xl bg-[#7B3A9E] text-white font-medium shadow-md hover:bg-[#6B2C91] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91] focus-visible:ring-offset-2"
            >
                <CirclePlus className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                Nova tarefa
            </button>

            <nav aria-label="Menu principal" className="flex flex-col gap-1">
                {itens.map(({ rota, label, Icone }) => (
                    <NavLink
                        key={rota}
                        to={rota}
                        title={label}
                        className={({ isActive }) =>
                            `flex items-center gap-3 h-11 px-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91] ${isActive ? 'bg-[#EBDDF5] text-[#4A2A63] font-medium' : 'text-[#8B5CA8] hover:bg-[#F5E9FA]'}`
                        }
                    >
                        <Icone className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <NavLink
                to="/profile"
                aria-label={`Perfil de ${usuario.nome}`}
                title={`Perfil de ${usuario.nome}`}
                className="mt-auto flex items-center gap-3 p-3 rounded-xl bg-[#F5E9FA] hover:bg-[#EBDDF5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91]"
            >
                <div
                    aria-hidden="true"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-[#4A2A63] text-sm font-bold"
                >
                    {usuario.iniciais}
                </div>
                <div className="leading-tight">
                    <p className="text-sm font-medium text-[#4A2A63]">{usuario.nome}</p>
                    <p className="text-xs text-[#A56BC9]">{usuario.descricao}</p>
                </div>
            </NavLink>
        </aside>
    );
}

export default Sidebar;