// src/App.tsx - componente React completo
import { useState } from "react"

/**
 * Interface que representa uma proposta comercial.
 * @interface Proposal
 * @property {number} id - Identificador único da proposta.
 * @property {string} cliente - Nome do cliente.
 * @property {Array<{ nome: string; quantidade: number; preco: number; }>} materiais - Lista de materiais da proposta.
 * @property {'Rascunho' | 'Em Aprovação' | 'Aprovada' | 'Enviada' | 'Ganha' | 'Perdida'} status - Status da proposta.
 * @property {number} total - Valor total da proposta.
 */
interface Proposal {
  id: number;
  cliente: string;
  materiais: Array<{ nome: string; quantidade: number; preco: number; }>;
  status: 'Rascunho' | 'Em Aprovação' | 'Aprovada' | 'Enviada' | 'Ganha' | 'Perdida';
  total: number;
}

/**
 * Interface que representa o formulário de criação de proposta.
 * @interface PropostaForm
 * @property {string} cliente - Nome do cliente.
 * @property {Array<{ nome: string; quantidade: number; preco: number; }>} materiais - Lista de materiais da proposta.
 * @property {'Rascunho' | 'Em Aprovação'} status - Status da proposta.
 * @property {number} total - Valor total da proposta.
 */
interface PropostaForm {
  cliente: string;
  materiais: Array<{ nome: string; quantidade: number; preco: number; }>;
  status: 'Rascunho' | 'Em Aprovação';
  total: number;
}

/**
 * Componente principal da aplicação.
 * @function App
 * @returns {JSX.Element} Elemento JSX do componente.
 */
export default function App() {
  /**
   * Estado que armazena a lista de propostas.
   * @type {Proposta[]}
   */
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  
  /**
   * Estado que armazena o formulário de criação de proposta.
   * @type {PropostaForm}
   */
  const [form, setForm] = useState<PropostaForm>({
    cliente: '',
    materiais: [],
    status: 'Rascunho',
    total: 0,
  });

  /**
   * Função que lida com as mudanças nos campos do formulário.
   * @function handleChange
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Evento de mudança.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**
   * Função que adiciona um novo material ao formulário.
   * @function handleAddMaterial
   */
  const handleAddMaterial = () => {
    setForm({
      ...form,
      materiais: [...form.materiais, { nome: '', quantidade: 0, preco: 0 }],
    });
  };

  /**
   * Função que remove um material do formulário.
   * @function handleRemoveMaterial
   * @param {number} index - Índice do material a ser removido.
   */
  const handleRemoveMaterial = (index: number) => {
    const materiaisAtualizados = form.materiais.filter((_, i) => i !== index);
    setForm({ ...form, materiais: materiaisAtualizados });
  };

  /**
   * Função que lida com o envio do formulário.
   * @function handleSubmit
   */
  const handleSubmit = () => {
    const total = form.materiais.reduce((acc, material) => acc + material.quantidade * material.preco, 0);
    const novaProposta: Proposta = {
      ...form,
      id: propostas.length + 1,
      total: total,
    };
    setPropostas([...propostas, novaProposta]);
    setForm({
      cliente: '',
      materiais: [],
      status: 'Rascunho',
      total: 0,
    });
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Propostas Comerciais</h1>
      <div className="bg-zinc-800 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Criar Nova Proposta</h2>
        <div className="mb-2">
          <label className="mr-2">Cliente:</label>
          <input
            type="text"
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            className="bg-zinc-700 p-1 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="mr-2">Materiais:</label>
          {form.materiais.map((material, index) => (
            <div key={index} className="mb-1">
              <input
                type="text"
                name="nome"
                value={material.nome}
                onChange={(e) => {
                  const materiaisAtualizados = [...form.materiais];
                  materiaisAtualizados[index].nome = e.target.value;
                  setForm({ ...form, materiais: materiaisAtualizados });
                }}
                placeholder="Nome"
                className="bg-zinc-700 p-1 rounded"
              />
              <input
                type="number"
                name="quantidade"
                value={material.quantidade}
                onChange={(e) => {
                  const materiaisAtualizados = [...form.materiais];
                  materiaisAtualizados[index].quantidade = parseInt(e.target.value);
                  setForm({ ...form, materiais: materiaisAtualizados });
                }}
                placeholder="Quantidade"
                className="bg-zinc-700 p-1 rounded"
              />
              <input
                type="number"
                name="preco"
                value={material.preco}
                onChange={(e) => {
                  const materiaisAtualizados = [...form.materiais];
                  materiaisAtualizados[index].preco = parseFloat(e.target.value);
                  setForm({ ...form, materiais: materiaisAtualizados });
                }}
                placeholder="Preço"
                className="bg-zinc-700 p-1 rounded"
              />
              <button onClick={() => handleRemoveMaterial(index)} className="bg-red-600 p-1 rounded ml-2">Remover</button>
            </div>
          ))}
          <button onClick={handleAddMaterial} className="bg-green-600 p-1 rounded mt-2">Adicionar Material</button>
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 p-1 rounded mt-2">Enviar Proposta</button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Lista de Propostas</h2>
        <table className="w-full bg-zinc-800 p-2 rounded-xl">
          <thead>
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {propostas.map((proposta) => (
              <tr key={proposta.id}>
                <td className="p-2">{proposta.id}</td>
                <td className="p-2">{proposta.cliente}</td>
                <td className="p-2">{proposta.status}</td>
                <td className="p-2">{proposta.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}