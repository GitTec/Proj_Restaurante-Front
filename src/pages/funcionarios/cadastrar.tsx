import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowCircleLeft, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth";
import { api } from "../../servicos/api";
//@ts-ignore
import styles from "./funcionarios.module.css";

export function CadastrarFuncionario(props: any) {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [dt_nascimento, setDt_Nascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const { usuario } = useAuth();

    useEffect(() => {
        if (id && usuario) {
            api.get(`/funcionarios/${id}`).then(res => {
                setNome(res.data.nome)
                setCPF(res.data.cpf)
                setEmail(res.data.email)
                setDt_Nascimento(format(new Date(res.data.dtNascimento), "yyyy-MM-dd").toString())
                setTelefone(res.data.telefone)
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
                id ? <h2>Editar Funcionario {id}</h2> : <h2>Cadastrar Funcionarios</h2>
            }
            <hr />
            <a href="/funcionarios">
                <Button variant="outline-success">
                    Voltar
                    <FaArrowCircleLeft />
                </Button>
            </a>

            <Form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (id) {
                        api.put(`/funcionarios/${id}`, {
                            nome,
                            cpf,
                            email,
                            dtNascimento: dt_nascimento,
                            telefone,
                            senha
                        }).then(res => {
                            alert("Editado com sucesso")
                        }).catch(error => {
                            alert(error)
                        })
                    } else {
                        api.post("/funcionarios", {
                            nome,
                            cpf,
                            email,
                            dtNascimento: dt_nascimento,
                            telefone,
                            senha
                        }).then(res => {
                            alert("Cadastrado com sucesso")
                            setNome("")
                            setCPF("")
                            setEmail("")
                            setSenha("")
                            setTelefone("")
                        }).catch(error => {
                            alert(error)
                        })
                    }
                }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(event) => {
                            setNome(event.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu CPF"
                        value={cpf}
                        onChange={(event) => {
                            setCPF(event.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu Email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                        type="telefone"
                        placeholder="Digite seu Telefone"
                        value={telefone}
                        onChange={(event) => {
                            setTelefone(event.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Digite sua data nascimento"
                        value={dt_nascimento}
                        onChange={(event) => {
                            setDt_Nascimento(event.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite uma senha"
                        value={senha}
                        onChange={(event) => {
                            setSenha(event.target.value)
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