import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowCircleLeft, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth";
import { api } from "../../servicos/api";
//@ts-ignore
import styles from "./categorias.module.css";

export function CadastrarCategoria(props: any) {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const { usuario } = useAuth();

    useEffect(() => {
        if (id && usuario) {
            console.log(api.defaults.headers.common)
            api.get(`/categorias/${id}`).then(res => {
                setNome(res.data.nome)
            }).catch(error => {
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
                id ? <h2>Editar categoria {id}</h2> : <h2>Cadastrar Categorias</h2>
            }
            <hr />
            <a href="/categorias">
                <Button variant="outline-success">
                    Voltar
                    <FaArrowCircleLeft />
                </Button>
            </a>

            <Form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (id) {
                        api.put(`/categorias/${id}`, {
                            nome
                        }).then(res => {
                            alert("Editado com sucesso")
                        }).catch(error => {
                            alert(error)
                        })
                    } else {
                        api.post("/categorias", {
                            nome,
                        }).then(res => {
                            alert("Cadastrado com sucesso")
                            setNome("")
                        }).catch(error => {
                            alert(error)
                        })
                    }
                }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Informe a categoria"
                        value={nome}
                        onChange={(event) => {
                            setNome(event.target.value)
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