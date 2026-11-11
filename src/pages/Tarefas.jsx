import { useState } from 'react';
import { Check, CalendarDays } from 'lucide-react';
import Header from '../components/layout/ui/header';
import { MATERIAS } from '../data/tarefas';

const CORES_MATERIAS = {
    'Biologia': 'bg-green-100 text-green-700',
    'Português': 'bg-red-100 text-red-700',
    'Matemática': 'bg-yellow-100 text-yellow-700',
    'Geografia': 'bg-blue-100 text-blue-700',
    'História': 'bg-orange-100 text-orange-700',
    'Física': 'bg-purple-100 text-purple-700',
    'Química': 'bg-teal-100 text-teal-700',
};

const COR_PADRAO = 'bg-[#EBDDF5] text-[#6B2C91]';

function formatarDataBR(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function BotaoFiltro({ ativo, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={ativo}
            className={`shrink-0 h-8 px-3 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91] focus-visible:ring-offset-2 ${
                ativo
                    ? 'bg-[#6B2C91] border-[#6B2C91] text-white font-medium'
                    : 'bg-white border-[#E3D5EE] text-[#8B5CA8] hover:bg-[#F5E9FA]'
            }`}
        >
            {children}
        </button>
    );
}

function CartaoTarefa({ tarefa, onAlternar }) {
    const { titulo, materia, data, concluida } = tarefa;

    return (
        <li
            className={`flex items-center gap-4 rounded-2xl border p-4 ${
                concluida
                    ? 'bg-white/50 border-transparent'
                    : 'bg-white border-[#EDE4F3]'
            }`}
        >
            <button
                type="button"
                role="checkbox"
                aria-checked={concluida}
                aria-label={
                    concluida
                        ? `Desmarcar "${titulo}"`
                        : `Concluir "${titulo}"`
                }
                onClick={onAlternar}
                className={`flex items-center justify-center shrink-0 w-6 h-6 md:w-5 md:h-5 rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91] focus-visible:ring-offset-2 ${
                    concluida
                        ? 'bg-[#D9BFEA] border-[#D9BFEA] text-white'
                        : 'border-[#7B3A9E] hover:bg-[#F5E9FA]'
                }`}
            >
                {concluida && (
                    <Check
                        className="w-4 h-4 md:w-3.5 md:h-3.5"
                        strokeWidth={3}
                        aria-hidden="true"
                    />
                )}
            </button>

            <div className={`min-w-0 flex-1 ${concluida ? 'opacity-50' : ''}`}>
                <p
                    className={`font-medium break-words md:text-sm ${
                        concluida
                            ? 'line-through text-[#B48DCC]'
                            : 'text-[#4A2A63]'
                    }`}
                >
                    {titulo}
                </p>

                <div className="mt-1.5 flex items-center gap-3 text-xs text-[#A56BC9]">
                    <span
                        className={`rounded px-1.5 py-0.5 ${
                            CORES_MATERIAS[materia] || COR_PADRAO
                        }`}
                    >
                        {materia}
                    </span>

                    {data && (
                        <time
                            dateTime={data}
                            className="flex items-center gap-1"
                        >
                            <CalendarDays
                                className="w-3.5 h-3.5"
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                            {formatarDataBR(data)}
                        </time>
                    )}
                </div>
            </div>
        </li>
    );
}

function Tarefas({ tarefas = [], onAlternar }) {
    const [filtro, setFiltro] = useState('Todas');

    const filtradas = tarefas
        .filter(
            (tarefa) =>
                filtro === 'Todas' || tarefa.materia === filtro
        )
        .sort((a, b) => (a.data || '').localeCompare(b.data || ''));

    const pendentes = filtradas.filter(
        (tarefa) => !tarefa.concluida
    );

    const concluidas = filtradas.filter(
        (tarefa) => tarefa.concluida
    );

    return (
        <>
            <Header titulo="Tarefas" />

            <main className="md:mx-auto md:max-w-xl">

                <nav
                    aria-label="Filtros de tarefas por matéria"
                    className="flex gap-2 overflow-x-auto px-5 md:px-0 pb-1 mb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {['Todas', ...MATERIAS].map((materia) => (
                        <BotaoFiltro
                            key={materia}
                            ativo={filtro === materia}
                            onClick={() => setFiltro(materia)}
                        >
                            {materia}
                        </BotaoFiltro>
                    ))}
                </nav>

                <div className="px-5 md:px-0">

                    <section aria-labelledby="pendentes-titulo">
                        <h2
                            id="pendentes-titulo"
                            className="sr-only"
                        >
                            Tarefas pendentes
                        </h2>

                        {pendentes.length > 0 ? (
                            <ul
                                aria-label="Lista de tarefas pendentes"
                                className="flex flex-col gap-3"
                            >
                                {pendentes.map((tarefa) => (
                                    <CartaoTarefa
                                        key={tarefa.id}
                                        tarefa={tarefa}
                                        onAlternar={() =>
                                            onAlternar(tarefa.id)
                                        }
                                    />
                                ))}
                            </ul>
                        ) : (
                            <div
                                role="status"
                                tabIndex={0}
                                className="rounded-2xl border border-dashed border-[#DFC9EE] bg-white/40 py-6 text-center text-sm text-[#A56BC9] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91] focus-visible:ring-offset-2"
                            >
                                Nenhuma tarefa pendente. 🎉
                            </div>
                        )}
                    </section>

                    {concluidas.length > 0 && (
                        <section
                            aria-labelledby="concluidas-titulo"
                            className="mt-8"
                        >
                            <h2
                                id="concluidas-titulo"
                                className="mb-3 text-xs font-bold tracking-wide text-[#A56BC9]"
                            >
                                CONCLUÍDAS
                            </h2>

                            <ul
                                aria-label="Lista de tarefas concluídas"
                                className="flex flex-col gap-3"
                            >
                                {concluidas.map((tarefa) => (
                                    <CartaoTarefa
                                        key={tarefa.id}
                                        tarefa={tarefa}
                                        onAlternar={() =>
                                            onAlternar(tarefa.id)
                                        }
                                    />
                                ))}
                            </ul>
                        </section>
                    )}

                </div>
            </main>
        </>
    );
}

export default Tarefas;