import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inicio } from '../pages/Inicio';
import { Login } from '../pages/login/login';
import { ListaFuncionarios } from '../pages/funcionarios/funcionarios';
import { CadastrarFuncionario } from '../pages/funcionarios/cadastrar';
import { ListaCategorias } from '../pages/categorias/categorias';
import { CadastrarCategoria } from '../pages/categorias/cadastrar';
import { ListaProdutos } from '../pages/produtos/produtos';
import { CadastrarProduto } from '../pages/produtos/cadastrar';
import { MostrarPerfil } from '../pages/perfil/perfil';
import { ListaPagamento } from '../pages/meiosPagamento/pagamentos';
import { CadastrarMeioPagamento } from '../pages/meiosPagamento/cadastrar';

export function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/funcionarios" element={<ListaFuncionarios />} />
            <Route path="/funcionarios/cadastrar" element={<CadastrarFuncionario />} />
            <Route path="/funcionarios/editar/:id" element={<CadastrarFuncionario />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/categorias/cadastrar" element={<CadastrarCategoria />} />
            <Route path="/categorias/editar/:id" element={<CadastrarCategoria />} />
            <Route path="/produtos" element={<ListaProdutos />} />
            <Route path="/produtos/cadastrar" element={<CadastrarProduto />} />
            <Route path="/produtos/editar/:id" element={<CadastrarProduto />} />
            <Route path="/pagamentos" element={<ListaPagamento />} />
            <Route path="/pagamentos/cadastrar" element={<CadastrarMeioPagamento />} />
            <Route path="/pagamentos/editar/:id" element={<CadastrarMeioPagamento />} />
            <Route path="/perfil" element={<MostrarPerfil />} />
        </Routes>
    </BrowserRouter>
}