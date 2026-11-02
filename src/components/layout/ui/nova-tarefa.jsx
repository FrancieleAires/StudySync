import { useState } from 'react';
import { X } from 'lucide-react';
import { MATERIAS } from '../../../data/tarefas';

function NovaTarefa({ aberto, onFechar, onSalvar }) {
    const [titulo, setTitulo] = useState('');
    const [materia, setMateria] = useState('');
    const [data, setData] = useState('');

    if (!aberto) return null;

    function handleSubmit(e) {
        e.preventDefault();
        if (!titulo.trim() || !materia || !data) return;

        onSalvar({
            id: Date.now(),
            titulo: titulo.trim(),
            materia,
            data,
            concluida: false,
        });

        setTitulo('');
        setMateria('');
        setData('');
        onFechar();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onFechar}
        >
            <div
                className="w-full max-w-md rounded-3xl bg-white p-6 md:p-7 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between md:hidden mb-2">
                    <span className="text-xs font-semibold text-[#6B2C91]">
                        Nova tarefa
                    </span>
                    <button
                        type="button"
                        onClick={onFechar}
                        aria-label="Fechar modal"
                        className="text-[#6B2C91] hover:text-[#4A2A63]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#4A2A63]">
                            Criar tarefa
                        </h2>
                        <p className="mt-0.5 text-xs text-[#A56BC9]">
                            Adicione uma nova tarefa à sua agenda.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onFechar}
                        aria-label="Fechar modal"
                        className="hidden md:block text-[#A56BC9] hover:text-[#6B2C91]"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#4A2A63]">
                            Título da tarefa
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Ex.: rascunho de redação"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full rounded-xl border border-[#EDE4F3] bg-[#F5E9FA]/40 px-3.5 py-2.5 text-sm text-[#4A2A63] placeholder-[#B48DCC] focus:border-[#A56BC9] focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#4A2A63]">
                                Disciplina
                            </label>
                            <select
                                required
                                value={materia}
                                onChange={(e) => setMateria(e.target.value)}
                                className="w-full rounded-xl border border-[#EDE4F3] bg-[#F5E9FA]/40 px-3 py-2.5 text-sm text-[#4A2A63] focus:border-[#A56BC9] focus:outline-none"
                            >
                                <option value="" disabled>
                                    Selecione a disciplina
                                </option>
                                {MATERIAS.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#4A2A63]">
                                Data de entrega
                            </label>
                            <input
                                type="date"
                                required
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="w-full rounded-xl border border-[#EDE4F3] bg-[#F5E9FA]/40 px-3.5 py-2.5 text-sm text-[#4A2A63] focus:border-[#A56BC9] focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-[#6B2C91] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#582378]"
                    >
                        Adicionar tarefa
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NovaTarefa;