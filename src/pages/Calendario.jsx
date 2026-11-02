import { useState } from 'react';
import Header from '../components/layout/ui/header';

const NOMES_MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const DIAS_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

function formatarData(ano, mes, dia) {
    return `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function BotaoMes({ children, onClick, label }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="flex items-center justify-center w-7 h-9 rounded-lg bg-[#F5E9FA] text-[#7B3A9E] text-sm hover:bg-[#EBDDF5] transition-colors"
        >
            {children}
        </button>
    );
}

function DiaCalendario({ dia, ehHoje, tarefas }) {
    return (
        <div
            className={`h-11 md:h-14 rounded-xl border p-1.5 md:p-1.5 flex flex-col gap-1 overflow-hidden ${ehHoje ? 'bg-[#F5E9FA] border-[#7B3A9E]' : 'bg-white border-[#E3D5EE]'}`}
        >
            <span className="text-xs text-[#4A2A63] leading-none">{dia}</span>

            {tarefas.map((tarefa) => (
                <div key={tarefa.id} title={tarefa.titulo}>
                    <div className={`md:hidden h-1 rounded-full ${tarefa.concluida ? 'bg-[#E9DDF3]' : 'bg-[#A56BC9]'}`} />
                    <div
                        className={`hidden md:block truncate rounded px-1 text-[9px] leading-[14px] ${tarefa.concluida ? 'bg-[#E9DDF3] text-[#B48DCC]' : 'bg-[#A56BC9] text-white'}`}
                    >
                        {tarefa.titulo}
                    </div>
                </div>
            ))}
        </div>
    );
}

function Calendario({ tarefas }) {
    const hoje = new Date();
    const [ano, setAno] = useState(hoje.getFullYear());
    const [mes, setMes] = useState(hoje.getMonth());

    function mesAnterior() {
        if (mes === 0) {
            setMes(11);
            setAno(ano - 1);
        } else {
            setMes(mes - 1);
        }
    }

    function proximoMes() {
        if (mes === 11) {
            setMes(0);
            setAno(ano + 1);
        } else {
            setMes(mes + 1);
        }
    }

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const dataHoje = formatarData(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    const celulas = [
        ...Array(primeiroDiaSemana).fill(null),
        ...Array.from({ length: totalDias }, (_, i) => i + 1),
    ];

    return (
        <>
            <Header titulo="Calendário" />

            <section className="select-none cursor-default mx-5 md:mx-auto md:max-w-xl rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-lg font-bold text-[#4A2A63]">
                        {NOMES_MESES[mes]} de {ano}
                    </h2>
                    <div className="flex gap-2">
                        <BotaoMes onClick={mesAnterior} label="Mês anterior">&lt;</BotaoMes>
                        <BotaoMes onClick={proximoMes} label="Próximo mês">&gt;</BotaoMes>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-3">
                    {DIAS_SEMANA.map((nome) => (
                        <span key={nome} className="text-center text-xs font-medium text-[#A56BC9]">
                            {nome}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {celulas.map((dia, indice) => {
                        if (dia === null) {
                            return <div key={`vazio-${indice}`} />;
                        }

                        const data = formatarData(ano, mes, dia);
                        return (
                            <DiaCalendario
                                key={data}
                                dia={dia}
                                ehHoje={data === dataHoje}
                                tarefas={tarefas.filter((tarefa) => tarefa.data === data)}
                            />
                        );
                    })}
                </div>
            </section>
        </>
    );
}

export default Calendario;
