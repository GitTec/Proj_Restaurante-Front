import { createContext, useContext, useState } from "react";
import Loading from "../components/loading";
import IChildrenProvider from "./childrean"

//DEFINO AS PROPRIEDADES  E FUNCOES QUE VÃO ESTAR DISPONIVEIS
interface LoadingContextData {
    carregando: boolean,
    switchCarregamento: (estado: boolean) => void
}

//EXPORTO O CONTEXTO QUE CRIEI DEFININDO O QUE ESTE CONTEXTO POSSUI
export const LoadingContext = createContext({} as LoadingContextData)

//AQUI DEFINO O PROVIDER QUE É ONDE SERÃO CRIADAS TUDO DO CONTEXTO
export function LoadingProvider({ children }: IChildrenProvider) {
    const [carregando, setCarregando] = useState(false)

    function switchCarregamento(estado: boolean) {
        setCarregando(estado)
    }
    return (
        <LoadingContext.Provider value={{ carregando, switchCarregamento }}>
            <Loading isLoading={carregando} />
            {children}
        </LoadingContext.Provider>
    )
}

//EXPORTO UMA INSTACIA DE LOADING CONTEXT
export const useLoading = () => useContext(LoadingContext)