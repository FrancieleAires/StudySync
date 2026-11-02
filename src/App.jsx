import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/layout/ui/footer'
import Sidebar from './components/layout/ui/sidebar'
import Header from './components/layout/ui/header'
import Calendario from './pages/Calendario'
import Tarefas from './pages/Tarefas'
import { TAREFAS_INICIAIS } from './data/tarefas'

const usuario = {
  nome: 'Ana Lima',
  iniciais: 'AL',
  descricao: 'Estudante Ensino Médio',
}

function EmConstrucao({ titulo }) {
  return (
    <>
      <Header titulo={titulo} />
      <p className="px-5 md:px-8 text-[#8B5CA8]">Tela em construção.</p>
    </>
  )
}

function App() {
  const [tarefas, setTarefas] = useState(TAREFAS_INICIAIS)

  function alternarTarefa(id) {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ))
  }

  function abrirNovaTarefa() {
    alert('Aqui vai abrir a tela de nova tarefa')
  }

  return (
    <div className="min-h-screen bg-[#F5E9FA]">
      <Sidebar onAdicionar={abrirNovaTarefa} usuario={usuario} />

      <main className="pb-24 md:pb-8 md:pl-56">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<EmConstrucao titulo="Dashboard" />} />
          <Route path="/tasks" element={<Tarefas tarefas={tarefas} onAlternar={alternarTarefa} />} />
          <Route path="/calendar" element={<Calendario tarefas={tarefas} />} />
          <Route path="/profile" element={<EmConstrucao titulo="Perfil" />} />
          <Route path="*" element={<EmConstrucao titulo="Página não encontrada" />} />
        </Routes>
      </main>

      <Footer onAdicionar={abrirNovaTarefa} iniciais={usuario.iniciais} />
    </div>
  )
}

export default App
