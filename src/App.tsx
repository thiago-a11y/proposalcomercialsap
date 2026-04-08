import { useState } from "react";

interface Proposal {
  id: number;
  cliente: string;
  materiais: Array<{ nome: string; quantidade: number; preco: number; }>;
  status: 'Rascunho' | 'Em Aprovação' | 'Aprovada' | 'Enviada' | 'Ganha' | 'Perdida';
  total: number;
}

interface PropostaForm {
  cliente: string;
  materiais: Array<{ nome: string; quantidade: number; preco: number; }>;
  status: 'Rascunho' | 'Em Aprovação';
  total: number;
}

const App = () => {
  const [propostas, setPropostas] = useState<Proposal[]>([]);
  const [form, setForm] = useState<PropostaForm>({
    cliente: '',
    materiais: [],
    status: 'Rascunho',
    total: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddMaterial = () => {
    setForm({
      ...form,
      materiais: [...form.materiais, { nome: '', quantidade: 0, preco: 0 }],
    });
  };

  const handleRemoveMaterial = (index: number) => {
    const materiaisAtualizados = form.materiais.filter((_, i) => i !== index);
    setForm({ ...form, materiais: materiaisAtualizados });
  };

  const handleUpdateMaterial = (index: number, campo: string, valor: string | number) => {
    const materiaisAtualizados = [...form.materiais];
    materiaisAtualizados[index][campo] = valor;
    setForm({ ...form, materiais: materiaisAtualizados });
  };

  const handleSubmit = () => {
    if (!form.cliente || form.materiais.length === 0) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const total = form.materiais.reduce((acc, material) => acc + material.quantidade * material.preco, 0);
    const novaProposta: Proposal = {
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
                onChange={(e) => handleUpdateMaterial(index, 'nome', e.target.value)}
                placeholder="Nome"
                className="bg-zinc-700 p-1 rounded"
              />
              <input
                type="number"
                name="quantidade"
                value={material.quantidade}
                onChange={(e) => handleUpdateMaterial(index, 'quantidade', parseInt(e.target.value))}
                placeholder="Quantidade"
                className="bg-zinc-700 p-1 rounded"
              />
              <input
                type="number"
                name="preco"
                value={material.preco}
                onChange={(e) => handleUpdateMaterial(index, 'preco', parseFloat(e.target.value))}
                placeholder="Preço"
                className="bg-zinc-700 p-1 rounded"
              />
              <button onClick={() => handleRemoveMaterial(index)} className="bg-red-600 p-1 rounded ml-2">Remover</button>
            </div>
          ))}
          <button onClick={handleAddMaterial} className="bg-green-600 p-1 rounded mt-2">Adicionar Material</button>
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 p-1 rounded">Criar Proposta</button>
      </div>
    </div>
  );
};

export default App;