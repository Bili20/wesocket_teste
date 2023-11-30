import "./style/cadastroGrupo.css";
import NavBar from "../../components/navbarComponents/navBar";
import { useState } from "react";
import { webFetch } from "../../axios/axiosConfig";

type grupo = {
  nome: string;
  descricao: string;
};

const INIT_ALL_GRUPO = {
  nome: "",
  descricao: "",
};

const CadastroGrupo = () => {
  const [grupo, setGrupo] = useState<grupo>(INIT_ALL_GRUPO);

  const criarGrupo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await webFetch.post("/grupo", {
        ...grupo,
      });
      setGrupo(INIT_ALL_GRUPO);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="cadastro-grupo"></div>
      <h2>Cadastro de Grupo</h2>
      <form onSubmit={criarGrupo}>
        <div className="form-control">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Digite aqui"
            value={grupo.nome}
            onChange={(e) =>
              setGrupo((old) => ({ ...old, nome: e.target.value }))
            }
          />
        </div>
        <div className="form-control">
          <label htmlFor="descricao">descrição:</label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            placeholder="Digite aqui"
            value={grupo.descricao}
            onChange={(e) =>
              setGrupo((old) => ({ ...old, descricao: e.target.value }))
            }
          />
        </div>
        <input type="submit" value="Criar" className="btn" />
      </form>
    </>
  );
};

export default CadastroGrupo;