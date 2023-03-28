import { Form, FormControl } from "react-bootstrap";
import Cabecalho from "../../components/cabecalho";
import { api } from "../../servicos/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//@ts-ignore
import styles from "./perfil.module.css";

export function MostrarPerfil() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [dt_nascimento, setDt_Nascimento] = useState("")
    const [telefone, setTelefone] = useState("")

    useEffect(() => {
        if (id) {
            api.get(`/funcionarios/${id}`).then(res => {
                setNome(res.data.nome)
                setCPF(res.data.cpf)
                setEmail(res.data.email)
                setDt_Nascimento(res.data.dt_nascimento)
                setTelefone(res.data.telefone)
            }).catch(error => {
                alert("Erro ao carregar informações")
            })
        }
    }, [])

    return <main>
        <Cabecalho />
        <h1 style={{ backgroundColor: "#1d7fbe" }}>Meu Perfil</h1>
        <br />
        <h3 style={{ color: "#002984" }}>Dados do Usuário</h3>
        <hr style={{ color: "blue" }} />

        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Nome:</Form.Label>
            </Form.Group>
        </Form >
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Email:</Form.Label>
            </Form.Group>
        </Form >
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>CPF:</Form.Label>
                <FormControl
                    type="text"
                    value={cpf}
                    onChange={(event) => {
                        setCPF(event.target.value)
                    }}
                />
            </Form.Group>
        </Form >
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Data de Nascimento:</Form.Label>
            </Form.Group>
        </Form >
    </main>
}