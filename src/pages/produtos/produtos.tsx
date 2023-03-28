import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth";
import { useLoading } from "../../hooks/loadingprovider";
import { IProduto } from "../../interfaces/produtos";
import { api } from "../../servicos/api";
//@ts-ignore
import styles from "./produtos.module.css";

export function ListaProdutos() {
    const { usuario } = useAuth();
    const [produtos, setProdutos] = useState<IProduto[]>([])
    const { switchCarregamento } = useLoading();

    useEffect(() => {
        if (usuario) {
            atualizarLista()
        }
    }, [usuario]) //lista de dependencias

    if (!usuario) {
        return <div>
            <Cabecalho />
            <h1>Ops...Você precisa fazer login para ter acesso</h1>
            <a href="/login">Fazer login</a>
        </div>
    }

    function atualizarLista() {
        switchCarregamento(true);
        api.get("/itens").then((res) => {
            setProdutos(res.data)
        }).catch((err) => {
            alert(err)
        }).finally(() => {
            switchCarregamento(false)
        })
    }

    function excluir(id: number) {
        if (window.confirm("Deseja realmente excluir o produto?") === true) {
            switchCarregamento(true)
            api.delete(`/itens/${id}`).then((res) => {
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
            <h2>PRODUTOS</h2>
            <a href="/produtos/cadastrar">
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
                        <th>Valor</th>
                        <th>Detalhes</th>
                        <th>Imagem</th>
                        <th>Categoria</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto) => {
                            return <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.valor}</td>
                                <td>{produto.detalhes}</td>
                                <td><img width={80} alt={produto.nome} src={`http://localhost:8000/uploads/${produto.imagem}`} /></td>
                                <td>{produto.categoria.nome}</td>
                                <td>
                                    <a href={`/produtos/editar/${produto.id}`}>
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
                                            excluir(produto.id)
                                        }}>
                                        <FaEdit color="white" />
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </main >
}