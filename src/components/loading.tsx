import { Spinner } from "react-bootstrap";

interface props {
    isLoading: boolean
}

function Loading({ isLoading }: props): JSX.Element {

    return <div style={{
        position: 'absolute',
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00000073",
        zIndex: 2,
        display: isLoading ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        top: 0,
        alignItems: "center"
    }}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
}

export default Loading;