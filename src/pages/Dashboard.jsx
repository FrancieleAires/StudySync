
import { Link } from 'react-router-dom';
import Header from '../components/layout/ui/header';

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
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function CartaoPrazo({ tarefa }) {
    const { titulo, materia, data } = tarefa;

    return (
        <li className="flex items-center gap-3.5 rounded-2xl border border-[#EDE4F3] bg-[#F5E9FA]/40 p-4">
            <div
                aria-hidden="true"
                className="w-1 self-stretch rounded-full bg-[#A56BC9]"
            />

            <div className="min-w-0">
                <p className="font-medium md:text-sm text-[#4A2A63] truncate">
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

                    <span>{formatarDataBR(data)}</span>
                </div>
            </div>
        </li>
    );
}

function Dashboard({ tarefas = [] }) {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        (tarefa) => tarefa.concluida
    ).length;

    const progresso = total > 0
        ? Math.round((concluidas / total) * 100)
        : 0;

    const pendentes = tarefas
        .filter((tarefa) => !tarefa.concluida)
        .sort((a, b) => a.data.localeCompare(b.data));

    const aSeguir = pendentes[0];
    const proximosPrazos = pendentes.slice(0, 4);

    return (
        <>
            <Header titulo="Dashboard" />

            <main className="px-6 md:px-10 mt-6 max-w-5xl space-y-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <section
                        aria-labelledby="progresso-titulo"
                        className="lg:col-span-2 flex flex-col justify-center rounded-3xl bg-white p-7 border border-[#EDE4F3]"
                    >
                        <div className="flex items-center justify-between gap-4 mb-5">
                            <div>
                                <h2
                                    id="progresso-titulo"
                                    className="font-bold text-[#4A2A63]"
                                >
                                    Progresso semanal
                                </h2>

                                <p className="text-xs text-[#A56BC9] mt-1">
                                    {concluidas} de {total} tarefas concluídas
                                </p>
                            </div>

                            <span
                                className="text-4xl font-bold text-[#6B2C91]"
                                aria-hidden="true"
                            >
                                {progresso}%
                            </span>
                        </div>

                        <div
                            role="progressbar"
                            aria-label="Progresso das tarefas concluídas"
                            aria-valuenow={progresso}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="h-3 w-full overflow-hidden rounded-full bg-[#EBDDF5]"
                        >
                            <div
                                aria-hidden="true"
                                className="h-full rounded-full bg-[#A56BC9] transition-all"
                                style={{ width: `${progresso}%` }}
                            />
                        </div>
                    </section>

                    <section
                        aria-labelledby="seguir-titulo"
                        className="rounded-3xl bg-[#6B2C91] p-7 text-white flex flex-col justify-between"
                    >
                        <div>
                            <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                                A seguir
                            </span>

                            {aSeguir ? (
                                <div className="mt-4">
                                    <h2
                                        id="seguir-titulo"
                                        className="text-lg font-bold leading-snug"
                                    >
                                        {aSeguir.titulo}
                                    </h2>

                                    <p className="mt-1 text-xs text-[#E3D5EE]">
                                        {aSeguir.materia}
                                    </p>
                                </div>
                            ) : (
                                <h2
                                    id="seguir-titulo"
                                    className="mt-4 text-sm text-[#E3D5EE]"
                                >
                                    Nenhuma tarefa pendente. 🎉
                                </h2>
                            )}
                        </div>

                        {aSeguir && (
                            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-xs">
                                <span className="text-[#E3D5EE]">
                                    Prazo
                                </span>

                                <span className="font-bold">
                                    {formatarDataBR(aSeguir.data)}
                                </span>
                            </div>
                        )}
                    </section>

                </div>

                <section
                    aria-labelledby="prazos-titulo"
                    className="rounded-3xl bg-white p-7 border border-[#EDE4F3]"
                >
                    <div className="mb-5 flex items-center justify-between">
                        <h2
                            id="prazos-titulo"
                            className="font-bold text-[#4A2A63]"
                        >
                            Próximos prazos
                        </h2>

                        <Link
                            to="/tasks"
                            className="text-xs font-bold text-[#6B2C91] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B2C91] focus-visible:ring-offset-2 rounded"
                        >
                            Ver todos
                        </Link>
                    </div>

                    {proximosPrazos.length > 0 ? (
                        <ul
                            aria-label="Próximos prazos das tarefas"
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {proximosPrazos.map((tarefa) => (
                                <CartaoPrazo
                                    key={tarefa.id}
                                    tarefa={tarefa}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="py-6 text-center text-sm text-[#A56BC9]">
                            Nenhuma tarefa pendente. 🎉
                        </p>
                    )}
                </section>

            </main>
        </>
    );
}

export default Dashboard;
