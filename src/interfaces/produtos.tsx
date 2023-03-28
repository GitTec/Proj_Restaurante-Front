import { ICategoria } from "./categorias"

export interface IProduto {
    id: number,
    nome: string,
    valor: number,
    detalhes: string,
    imagem: string,
    idCategoria: number,
    categoria: ICategoria;
}

export interface IProdutoCarrinho extends IProduto {
    quantidade: number;
}