import { Link } from 'react-router-dom';
import Header from '../components/layout/ui/header';

function formatarDataBR(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

function CartaoPrazo({ tarefa }) {
    const { titulo, materia, data } = tarefa;

    return (
        <li className="flex items-center gap-3.5 rounded-2xl border border-[#EDE4F3] bg-[#F5E9FA]/40 p-4">
            <div className="w-1 self-stretch rounded-full bg-[#A56BC9]" />

            <div className="min-w-0">
                <p className="font-medium md:text-sm text-[#4A2A63] truncate">
                    {titulo}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-[#A56BC9]">
                    <span className="rounded px-1.5 py-0.5 bg-[#EBDDF5] text-[#6B2C91]">
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
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

    const pendentes = tarefas
        .filter((tarefa) => !tarefa.concluida)
        .sort((a, b) => a.data.localeCompare(b.data));

    const aSeguir = pendentes[0];
    const proximosPrazos = pendentes.slice(0, 4);

    return (
        <>
            <Header titulo="Dashboard" />

            <div className="select-none px-6 md:px-10 mt-6 max-w-5xl space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col justify-center rounded-3xl bg-white p-7 border border-[#EDE4F3]">
                        <div className="flex items-center justify-between gap-4 mb-5">
                            <div>
                                <h2 className="font-bold text-[#4A2A63]">
                                    Progresso semanal
                                </h2>
                                <p className="text-xs text-[#A56BC9] mt-1">
                                    {concluidas} de {total} tarefas concluídas
                                </p>
                            </div>
                            <span className="text-4xl font-bold text-[#6B2C91]">
                                {progresso}%
                            </span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-[#EBDDF5]">
                            <div
                                className="h-full rounded-full bg-[#A56BC9] transition-all"
                                style={{ width: `${progresso}%` }}
                            />
                        </div>
                    </div>

                    <div className="rounded-3xl bg-[#6B2C91] p-7 text-white flex flex-col justify-between">
                        <div>
                            <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                                A seguir
                            </span>

                            {aSeguir ? (
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold leading-snug">
                                        {aSeguir.titulo}
                                    </h3>
                                    <p className="mt-1 text-xs text-[#E3D5EE]">
                                        {aSeguir.materia}
                                    </p>
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-[#E3D5EE]">
                                    Nenhuma tarefa pendente. 🎉
                                </p>
                            )}
                        </div>

                        {aSeguir && (
                            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-xs">
                                <span className="text-[#E3D5EE]">Prazo</span>
                                <span className="font-bold">
                                    {formatarDataBR(aSeguir.data)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-7 border border-[#EDE4F3]">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="font-bold text-[#4A2A63]">
                            Próximos prazos
                        </h2>
                        <Link
                            to="/tasks"
                            className="text-xs font-bold text-[#6B2C91] hover:underline"
                        >
                            Ver todos
                        </Link>
                    </div>

                    {proximosPrazos.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {proximosPrazos.map((tarefa) => (
                                <CartaoPrazo key={tarefa.id} tarefa={tarefa} />
                            ))}
                        </ul>
                    ) : (
                        <p className="py-6 text-center text-sm text-[#A56BC9]">
                            Nenhuma tarefa pendente. 🎉
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;