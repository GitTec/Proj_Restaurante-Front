import { createContext, useState, useContext, useEffect } from "react"
import { IUsuarios } from "../interfaces/usuarios"
import { api } from "../servicos/api"
import ChildrenProvider from "./childrean"
import { useLoading } from "./loadingprovider"

interface AuthContextData {
    usuario: IUsuarios | undefined,
    token: string,
    fazerLogin: (email: string, senha: string, callback: () => void) => Promise<void>,
    fazerLogout: (callback: () => void) => void
}

export const AuthContext = createContext({} as AuthContextData)
export const AuthProvider = ({ children }: ChildrenProvider) => {
    const [usuario, setUsuario] = useState<IUsuarios | undefined>();
    const [token, setToken] = useState<string>('');

    //useState -- cria um estado pra aplicacao, recebe por parametro o valor padrao do estado
    //useEffect -- olha pra um estado e sempre que o estado mudar ele executa a funcao que recebe por calback
    //OBS: QUANDO O ARRAY DE DEPENDENCIAS ESTA VAZIO A FUNCAO DO USEEFFECT SERA EXECUTADA SOMENTE UMA VEZ AO CARREGAR A PAGINA
    //hooks personalizados(auth, loading...) criar uma constante que vai pegar uma propriedade exportada do contexto e 
    //vai permitir que essa pagina utilize essa propriedade ou funcao

    useEffect(() => {
        const tokenSalvo = localStorage.getItem("app-restaurante-token")
        const usuarioSalvo = localStorage.getItem("app-restaurante-usuario")
        if (tokenSalvo && usuarioSalvo) {
            setToken(tokenSalvo)
            setUsuario(JSON.parse(usuarioSalvo))
            api.defaults.headers.common['authorization'] = `Bearer ${tokenSalvo}`;
        }
    }, [])

    const { switchCarregamento } = useLoading()

    async function fazerLogin(email: string, senha: string, callback: () => void) {
        switchCarregamento(true)
        return api.post('/funcionarios/login', { email, senha }).then(res => {
            setUsuario(res.data.funcionario)
            setToken(res.data.token)
            //adicione o token no header authorization em todos as rotas
            api.defaults.headers.common['authorization'] = `Bearer ${token}`;
            localStorage.setItem("app-restaurante-token", res.data.token);
            localStorage.setItem("app-restaurante-usuario", JSON.stringify(res.data.funcionario));
            callback()
        }).catch((err) => {
            alert("Login ou senha incorretos")
        }).finally(() => {
            switchCarregamento(false)
        });
    };

    async function fazerLogout(callback: () => void) {
        setUsuario(undefined)
        setToken('')
        localStorage.removeItem("app-restaurante-usuario")
        localStorage.removeItem("app-restaurante-token")
        api.defaults.headers.common['authorization'] = '';
        callback()
    }

    return (
        <AuthContext.Provider value={{
            usuario, fazerLogout, token, fazerLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)