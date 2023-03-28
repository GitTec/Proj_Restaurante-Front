import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowCircleLeft, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth";
import { api } from "../../servicos/api";
//@ts-ignore
import styles from "./pagamento.module.css";

export function CadastrarMeioPagamento(props: any) {

    const { id } = useParams();
    const [tipoPagamento, setTipoPagamento] = useState("");
    const [acrescimos, setAcrescimos] = useState("");
    const { usuario } = useAuth();

    useEffect(() => {
        if (id && usuario) {
            api.get(`/meiopgtos/${id}`).then(res => {
                setTipoPagamento(res.data.tipo_pagamento)
                setAcrescimos(res.data.valor_acrescimos)
            }).catch(error => {
                console.log(error)
                alert("Erro ao carregar informações")
            })
        }
    }, [usuario])

    if (!usuario) {
        return <div>
            <Cabecalho />
            <h1>Ops... Você precisa fazer login para ter acesso</h1>
            <a href="/login">Fazer login</a>
        </div>
    }

    return <main>
        <Cabecalho />
        <div className={styles.conteudo}>
            {
                id ? <h2>Editar Meio Pagamento {id}</h2> : <h2>Cadastrar Meio Pagamento</h2>
            }
            <hr />
            <a href="/pagamentos">
                <Button variant="outline-success">
                    Voltar
                    <FaArrowCircleLeft />
                </Button>
            </a>

            <Form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (id) {
                        api.put(`/meiopgtos/${id}`, {
                            tipo_pagamento: tipoPagamento,
                            valor_acrescimos: acrescimos
                        }).then(res => {
                            alert("Editado com sucesso")
                        }).catch(error => {
                            alert(error)
                        })
                    } else {
                        api.post("/meiopgtos", {
                            tipo_pagamento: tipoPagamento,
                            valor_acrescimos: acrescimos
                        }).then(res => {
                            alert("Cadastrado com sucesso")
                            setTipoPagamento("")
                            setAcrescimos("")
                        }).catch(error => {
                            alert(error)
                        })
                    }
                }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Tipo de Pagamento:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Informe o meio de pagamento"
                        value={tipoPagamento}
                        onChange={(event) => {
                            setTipoPagamento(event.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Acrescimos:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Informe o acrescimo"
                        value={acrescimos}
                        onChange={(event) => {
                            setAcrescimos(event.target.value)
                        }}
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="outline-success" type="submit">
                        Salvar
                        <FaSave />
                    </Button>
                </div>
            </Form>
        </div>
    </main>
}