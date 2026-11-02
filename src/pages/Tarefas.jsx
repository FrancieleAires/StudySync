import { useState } from 'react';
import { Check, CalendarDays } from 'lucide-react';
import Header from '../components/layout/ui/header';
import { MATERIAS } from '../data/tarefas';

function formatarDataBR(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function BotaoFiltro({ ativo, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`shrink-0 h-8 px-3 rounded-full border text-sm transition-colors ${ativo ? 'bg-[#6B2C91] border-[#6B2C91] text-white font-medium' : 'bg-white border-[#E3D5EE] text-[#8B5CA8] hover:bg-[#F5E9FA]'}`}
        >
            {children}
        </button>
    );
}

function CartaoTarefa({ tarefa, onAlternar }) {
    const { titulo, materia, data, concluida } = tarefa;

    return (
        <li
            className={`flex items-center gap-4 rounded-2xl border p-4 ${concluida ? 'bg-white/50 border-transparent' : 'bg-white border-[#EDE4F3]'}`}
        >
            <button
                type="button"
                role="checkbox"
                aria-checked={concluida}
                aria-label={concluida ? `Desmarcar "${titulo}"` : `Concluir "${titulo}"`}
                onClick={onAlternar}
                className={`flex items-center justify-center shrink-0 w-6 h-6 md:w-5 md:h-5 rounded-md border-2 transition-colors ${concluida ? 'bg-[#D9BFEA] border-[#D9BFEA] text-white' : 'border-[#7B3A9E] hover:bg-[#F5E9FA]'}`}
            >
                {concluida && <Check className="w-4 h-4 md:w-3.5 md:h-3.5" strokeWidth={3} />}
            </button>

            <div className={`min-w-0 ${concluida ? 'opacity-50' : ''}`}>
                <p className={`font-medium md:text-sm ${concluida ? 'line-through text-[#B48DCC]' : 'text-[#4A2A63]'}`}>
                    {titulo}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-[#A56BC9]">
                    <span className="rounded px-1.5 py-0.5 bg-[#EBDDF5] text-[#6B2C91]">{materia}</span>
                    <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
                        {formatarDataBR(data)}
                    </span>
                </div>
            </div>
        </li>
    );
}

function Tarefas({ tarefas, onAlternar }) {
    const [filtro, setFiltro] = useState('Todas');

    const filtradas = tarefas
        .filter((tarefa) => filtro === 'Todas' || tarefa.materia === filtro)
        .sort((a, b) => a.data.localeCompare(b.data));

    const pendentes = filtradas.filter((tarefa) => !tarefa.concluida);
    const concluidas = filtradas.filter((tarefa) => tarefa.concluida);

    return (
        <>
            <Header titulo="Tarefas" />

            <div className="select-none md:mx-auto md:max-w-xl">
                <div className="flex gap-2 overflow-x-auto px-5 md:px-0 pb-1 mb-5 [scrollbar-width:none]">
                    {['Todas', ...MATERIAS].map((materia) => (
                        <BotaoFiltro key={materia} ativo={filtro === materia} onClick={() => setFiltro(materia)}>
                            {materia}
                        </BotaoFiltro>
                    ))}
                </div>

                <div className="px-5 md:px-0">
                    {pendentes.length > 0 ? (
                        <ul className="flex flex-col gap-3">
                            {pendentes.map((tarefa) => (
                                <CartaoTarefa key={tarefa.id} tarefa={tarefa} onAlternar={() => onAlternar(tarefa.id)} />
                            ))}
                        </ul>
                    ) : (
                        <p className="py-6 text-center text-sm text-[#A56BC9]">Nenhuma tarefa pendente. 🎉</p>
                    )}

                    {concluidas.length > 0 && (
                        <>
                            <h2 className="mt-8 mb-3 text-xs font-bold tracking-wide text-[#A56BC9]">CONCLUÍDAS</h2>
                            <ul className="flex flex-col gap-3">
                                {concluidas.map((tarefa) => (
                                    <CartaoTarefa key={tarefa.id} tarefa={tarefa} onAlternar={() => onAlternar(tarefa.id)} />
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tarefas;
