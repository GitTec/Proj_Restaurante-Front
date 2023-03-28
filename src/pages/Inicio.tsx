import { Card, Form } from "react-bootstrap";
import Cabecalho from "../components/cabecalho";
import { useAuth } from "../hooks/auth";
import { IProduto } from "../interfaces/produtos";
import { useEffect, useState } from "react"
import { api } from "../servicos/api";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrinho } from "../hooks/carrinho";
//@ts-ignore
import styles from "./Inicio.module.css"

export function Inicio(props: any) {
    const { usuario } = useAuth();
    const { produtos, adicionarCarrinho } = useCarrinho();
    const [listaProdutos, setListaProdutos] = useState<IProduto[]>([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        api.get("/itens").then(res => {
            setListaProdutos(res.data)
        }).catch((err) => {
            alert("Erro ao carregar informações dos produtos")
        })
    }, [usuario])

    return <main>
        <Cabecalho />
        {
            usuario ? <h2>Olá {usuario?.nome}, seja bem vindo a tela de pedidos</h2> : <a href="/login">Fazer login</a>
        }
        <Form.Control type="text" value={pesquisa} onChange={(event) => setPesquisa(event.target.value)} placeholder="Pesquisar. . ." />
        {pesquisa != "" && <span>Buscando por: {pesquisa}</span>}

        <div className={styles.CardContainer}>
            {
                listaProdutos.filter(prd => { return prd.nome.toLowerCase().includes(pesquisa.toLowerCase()) }).map((produto) => {
                    return <Card className={styles.headerCard} key={produto.id} >
                        <Card.Img className={styles.imgCard} variant="top" src={`http://localhost:8000/uploads/${produto.imagem}`} />
                        <Card.Body className={styles.corpoCard}>
                            <Card.Title className={styles.tituloCard}>{produto.nome}</Card.Title>
                            <strong>{produto.categoria.nome}</strong>
                            <Card.Text className={styles.textCard}>{produto.detalhes}</Card.Text>
                            <Card.Link className={styles.botaoCard} onClick={() => {
                                adicionarCarrinho({
                                    ...produto,
                                    quantidade: 1
                                })
                            }}>Adicionar <FaShoppingCart /></Card.Link>
                        </Card.Body>
                    </Card>
                })
            }
        </div>
    </main >
}