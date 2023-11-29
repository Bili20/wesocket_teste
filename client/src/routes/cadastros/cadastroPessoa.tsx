import "./style/cadastroPessoa.css";
import NavBar from "../../components/navbarComponents/navBar";
import { webFetch } from "../../axios/axiosConfig";
import { useEffect, useState } from "react";

export type pessoa = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
};

const INIT_ALL_USER = {
  cpf: "",
  email: "",
  nome: "",
  senha: "",
};

type grupos = {
  id: number;
  nome: string;
  descricao: string;
};

const CadastroPessoa = () => {
  const [user, setUser] = useState<pessoa>(INIT_ALL_USER);
  const [grupos, setGrupo] = useState<grupos[]>([]);
  const [selectedValue, setSelectedValue] = useState("");

  const criarUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usuario = await webFetch.post("/pessoa", {
        ...user,
      });
      setUser(INIT_ALL_USER);
      console.log();
      adicionaGrupo(usuario.data.id, Number(selectedValue));
    } catch (e) {
      console.error(e);
    }
  };

  const adicionaGrupo = async (idUser: number, idGrupo: number) => {
    try {
      await webFetch.patch(`/pessoa/${idUser}/envia/grupo/${idGrupo}`);
    } catch (e) {
      console.error(e);
    }
  };

  const getGrupos = async () => {
    try {
      const response = await webFetch.get("/grupo");

      const data = response.data;

      setGrupo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGrupos();
  }, []);

  return (
    <>
      <NavBar />
      <div className="cadastro-user">
        <h2>Cadastro de Usuario:</h2>
        <form onSubmit={criarUser}>
          <div className="form-control">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite aqui"
              value={user.nome}
              onChange={(e) =>
                setUser((old) => ({ ...old, nome: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite aqui"
              value={user.email}
              onChange={(e) =>
                setUser((old) => ({ ...old, email: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite aqui"
              value={user.senha}
              onChange={(e) =>
                setUser((old) => ({ ...old, senha: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="cpf">Cpf:</label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              placeholder="Digite aqui"
              value={user.cpf}
              onChange={(e) =>
                setUser((old) => ({ ...old, cpf: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <select
              name="grupos"
              id="grupos"
              defaultValue={""}
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione um Grupo
              </option>
              {grupos.map((grupo) => (
                <option value={grupo.id}>{grupo.nome}</option>
              ))}
            </select>
          </div>
          <input type="submit" value="Criar" className="btn" />
        </form>
      </div>
    </>
  );
};

export default CadastroPessoa;
