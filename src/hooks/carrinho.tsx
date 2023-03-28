import { createContext, useContext, useState } from "react";
import Loading from "../components/loading";
import { IProdutoCarrinho } from "../interfaces/produtos";
import IChildrenProvider from "./childrean"

//DEFINO AS PROPRIEDADES  E FUNCOES QUE VÃO ESTAR DISPONIVEIS
export interface CarrinhoContextData {
    produtos: IProdutoCarrinho[]
    adicionarCarrinho: (produto: IProdutoCarrinho) => void
    removerCarrinho: (id: number) => void
}

//EXPORTO O CONTEXTO QUE CRIEI DEFININDO O QUE ESTE CONTEXTO POSSUI
export const CarrinhoContext = createContext({} as CarrinhoContextData)

//AQUI DEFINO O PROVIDER QUE É ONDE SERÃO CRIADAS TUDO DO CONTEXTO
export function CarrinhoProvider({ children }: IChildrenProvider) {
    const [produtos, setProdutos] = useState<IProdutoCarrinho[]>([])
    function adicionarCarrinho(produto: IProdutoCarrinho) {
        // const copia = [...produtos, produto]
        const copia = [...produtos]
        copia.push(produto)
        setProdutos(copia)
        console.log(copia)
    }

    function removerCarrinho(id: number) {
        const copia = [...produtos]
        copia.filter(p => { return p.id != id })
        setProdutos(copia)
    }

    return (
        <CarrinhoContext.Provider value={{ produtos, adicionarCarrinho, removerCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

//EXPORTO UMA INSTACIA DE LOADING CONTEXT
export const useCarrinho = () => useContext(CarrinhoContext)