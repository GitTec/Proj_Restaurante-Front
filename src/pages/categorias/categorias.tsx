import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth"
import { useEffect, useState } from "react"
import { api } from "../../servicos/api";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
//@ts-ignore
import styles from "./categorias.module.css";
import { Button, Table } from "react-bootstrap";
import { ICategoria } from "../../interfaces/categorias";
import { useLoading } from "../../hooks/loadingprovider";

export function ListaCategorias() {
    const { usuario } = useAuth();
    const [categorias, setCategorias] = useState<ICategoria[]>([])
    const { switchCarregamento } = useLoading();

    useEffect(() => {
        if (usuario) {
            api.get("/categorias").then(res => {
                setCategorias(res.data)
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
        api.get('/categorias').then((res) => {
            setCategorias(res.data)
        }).catch((err) => {
            alert(err)
        }).finally(() => {
            switchCarregamento(false)
        })
    }

    function excluir(id: number) {
        if (window.confirm("Deseja realmente excluir a categoria?") === true) {
            switchCarregamento(true)
            api.delete(`/categorias/${id}`).then((res) => {
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
            <h2>CATEGORIAS</h2>
            <a href="/categorias/cadastrar">
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria) => {
                            return <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nome}</td>
                                <td>
                                    <a href={`/categorias/editar/${categoria.id}`}>
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
                                            excluir(categoria.id)
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