import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth"
import { useEffect, useState } from "react"
import { api } from "../../servicos/api";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
//@ts-ignore
import styles from "./funcionarios.module.css";
import { IUsuarios } from "../../interfaces/usuarios";
import { Button, Table } from "react-bootstrap";
import { useLoading } from "../../hooks/loadingprovider";
import { format } from "date-fns";

export function ListaFuncionarios() {
    const { usuario } = useAuth();
    const [funcionarios, setFuncionarios] = useState<IUsuarios[]>([])
    const { switchCarregamento } = useLoading();

    useEffect(() => {
        if (usuario) {
            api.get("/funcionarios").then(res => {
                setFuncionarios(res.data)
            }).catch(err => {
                alert(err)
            })
        }
    }, [usuario])  //lista de dependecias

    if (!usuario) {
        return <div>
            <Cabecalho />
            <h1>Ops... Você precisa fazer login para ter acesso</h1>
            <a href="/login">Fazer login</a>
        </div>
    }

    function atualizarLista() {
        switchCarregamento(true)
        api.get('/funcionarios').then((res) => {
            setFuncionarios(res.data)
        }).catch((err) => {
            alert(err)
        }).finally(() => {
            switchCarregamento(false)
        })
    }

    function excluir(id: number) {
        if (window.confirm("Deseja realmente excluir o funcionario?") === true) {
            switchCarregamento(true)
            api.delete(`/funcionarios/${id}`).then((res) => {
                atualizarLista()
            }).catch((err) => {
                alert(err)
            }).finally(() => {
                switchCarregamento(false)
            })
        }
    }

    return <main>
        <Cabecalho />
        <div className={styles.conteudo}>
            <h2>FUNCIONÁRIOS</h2>
            <a href="/funcionarios/cadastrar">
                <Button>
                    ADICIONAR
                    <FaPlusCircle />
                </Button>
            </a>
            <hr />
            <Table striped bordered hover>
                <thead className={styles.cab_table}>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Dt_Nascimento</th>
                        <th>Telefone</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        funcionarios.map((funcionario) => {
                            return <tr key={funcionario.id}>
                                <td>{funcionario.id}</td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.email}</td>
                                <td>{funcionario.cpf}</td>
                                <td>{format(new Date(funcionario.dtNascimento), "dd-MM-yyyy")}</td>
                                <td>{funcionario.telefone}</td>
                                <td>
                                    <a href={`/funcionarios/editar/${funcionario.id}`}>
                                        <Button
                                            variant="primary">
                                            <FaEdit color="white" />
                                        </Button>
                                    </a>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            excluir(funcionario.id)
                                        }}>
                                        <FaTrash color="white" />
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </main>
}