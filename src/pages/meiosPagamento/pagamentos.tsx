import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth";
import { useLoading } from "../../hooks/loadingprovider";
import { IPagamento } from "../../interfaces/pagamento";
import { api } from "../../servicos/api";
//@ts-ignore
import styles from "./pagamento.module.css";

export function ListaPagamento() {
    const { usuario } = useAuth();
    const [pagamento, setPagamento] = useState<IPagamento[]>([]);
    const { switchCarregamento } = useLoading();

    useEffect(() => {
        if (usuario) {
            atualizarLista()
        }
    }, [usuario])

    if (!usuario) {
        return <div>
            <Cabecalho />
            <h1>Ops...Você precisa fazer login para ter acesso</h1>
            <a href="/login">Fazer login</a>
        </div>
    }

    function atualizarLista() {
        switchCarregamento(true);
        api.get("/meiopgtos").then((res) => {
            setPagamento(res.data)
        }).catch((err) => {
            alert(err)
        }).finally(() => {
            switchCarregamento(false)
        })
    }

    function excluir(id: number) {
        if (window.confirm("Deseja realmente excluir o meio de pagamento?") === true) {
            switchCarregamento(true)
            api.delete(`/meiopgtos/${id}`).then((res) => {
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

            <h2>PAGAMENTOS</h2>
            <a href="/pagamentos/cadastrar">
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
                        <th>Tipo de Pagamento</th>
                        <th>Taxa Acrescimos</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pagamento.map((pagamento) => {
                            return <tr key={pagamento.id}>
                                <td>{pagamento.id}</td>
                                <td>{pagamento.tipo_pagamento}</td>
                                <td>{pagamento.valor_acrescimos}</td>
                                <td>
                                    <a href={`/pagamentos/editar/${pagamento.id}`}>
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
                                            excluir(pagamento.id)
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