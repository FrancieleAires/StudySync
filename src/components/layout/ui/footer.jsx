import { NavLink } from 'react-router-dom';
import { House, SquareCheckBig, CirclePlus, CalendarDays } from 'lucide-react';

const itensEsquerda = [
    { rota: '/dashboard', label: 'Início', Icone: House },
    { rota: '/tasks', label: 'Tarefas', Icone: SquareCheckBig },
];

const itensDireita = [
    { rota: '/calendar', label: 'Calendário', Icone: CalendarDays },
];

function BotaoNav({ item }) {
    const { rota, label, Icone } = item;

    return (
        <NavLink
            to={rota}
            aria-label={label}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-[#4A2A63]' : 'text-[#8B5CA8] hover:text-[#6B2C91]'}`
            }
        >
            {({ isActive }) => (
                <>
                    <Icone className="w-6 h-6" strokeWidth={1.75} />
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#2D1B3D]' : 'bg-transparent'}`} />
                </>
            )}
        </NavLink>
    );
}

function Footer({ onAdicionar, iniciais = 'AL' }) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-[#EDE4F3] md:hidden">
            <div className="grid h-full grid-cols-5 items-center">
                {itensEsquerda.map((item) => (
                    <BotaoNav key={item.rota} item={item} />
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        aria-label="Adicionar"
                        onClick={onAdicionar}
                        className="-mt-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#6B2C91] text-white shadow-lg hover:bg-[#5A2479] active:scale-95 transition"
                    >
                        <CirclePlus className="w-8 h-8" strokeWidth={1.75} />
                    </button>
                </div>

                {itensDireita.map((item) => (
                    <BotaoNav key={item.rota} item={item} />
                ))}

                <NavLink to="/profile" aria-label="Perfil" className="flex flex-col items-center justify-center gap-1">
                    {({ isActive }) => (
                        <>
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#EBDDF5] text-[#4A2A63] text-sm font-semibold">
                                {iniciais}
                            </span>
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#2D1B3D]' : 'bg-transparent'}`} />
                        </>
                    )}
                </NavLink>
            </div>
        </nav>
    );
}

export default Footer;
