import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowCircleLeft, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import { useAuth } from "../../hooks/auth";
import { ICategoria } from "../../interfaces/categorias";
import { api } from "../../servicos/api";
//@ts-ignore
import styles from "./produtos.module.css";

export function CadastrarProduto(props: any) {

    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [imagem, setImagem] = useState<File>();
    const [idCategoria, setIdCategoria] = useState(0);
    const [listaCategorias, setListaCategorias] = useState<ICategoria[]>([]);
    const { usuario } = useAuth();

    useEffect(() => {
        api.get("/categorias").then(res => {
            setListaCategorias(res.data)
        }).catch((err) => {
            alert("Erro ao carregar categorias")
        })

        if (id && usuario) {
            api.get(`/itens/${id}`).then(res => {
                setIdCategoria(res.data.idCategoria)
                setNome(res.data.nome)
                setValor(res.data.valor)
                setDetalhes(res.data.detalhes)
                setImagem(res.data.imagem)
            }).catch((error) => {
                alert("Erro ao carregar informações do produto")
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
                id ? <h2>Editar Produto{id}</h2> : <h2>Cadastrar Produto</h2>
            }
            <hr />
            <a href="/produtos">
                <Button variant="outline-success">
                    Voltar
                    <FaArrowCircleLeft />
                </Button>
            </a>

            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    const dados = new FormData(); //Multiparm form do insonia
                    dados.append("nome", nome)
                    dados.append("valor", valor)
                    dados.append("detalhes", detalhes)
                    dados.append("idCategoria", String(idCategoria))
                    dados.append("imagem", imagem ? imagem : "")

                    if (id) {
                        api.put(`/itens/${id}`, dados).then(res => {
                            alert("Editado com sucesso")
                        }).catch(error => {
                            alert(error)
                        })
                    } else {
                        api.post("/itens", dados).then(res => {
                            alert("Cadastrado com sucesso")
                            setNome("")
                            setValor("")
                            setDetalhes("")
                        }).catch(error => {
                            alert(error)
                        })
                    }
                }}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do produto"
                        value={nome}
                        onChange={(event) => {
                            setNome(event.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Valor:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o valor do produto"
                        value={valor}
                        onChange={(event) => {
                            setValor(event.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Detalhes:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Informe os detalhes do produto"
                        value={detalhes}
                        onChange={(event) => {
                            setDetalhes(event.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Imagem:</Form.Label>
                    <input
                        type="file"
                        onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                                setImagem(event.target.files[0])
                            }
                        }} />
                </Form.Group>
                <Form.Select value={idCategoria} onChange={event => {
                    setIdCategoria(+event.target.value)
                }}>
                    <option>Selecione a categoria</option>
                    {listaCategorias.map(categoria => {
                        return <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    })}
                </Form.Select>
                <hr />
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

