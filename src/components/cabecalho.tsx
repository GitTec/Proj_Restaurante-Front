import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../hooks/auth';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTeamspeak, FaUserCircle } from 'react-icons/fa';
import { ImExit } from "react-icons/im";
//@ts-ignore
import styles from "./cabecalho.module.css";

function Cabecalho() {
    const { usuario, fazerLogout } = useAuth();
    let navigate = useNavigate();
    return (
        <Navbar className={styles.NavCabecalho} style={{ backgroundColor: '#002984' }}>
            <Container>
                <Navbar.Brand href="/" style={{ //navbar brand--logo do sistema    //'#367CD2'
                    color: '#92B4FA',
                    fontWeight: 'bold'
                }}><img src='/logorato.png' className='d-inline-block align-top' width="40" height="40" />Restaurant</Navbar.Brand>

                <Nav className='me-auto'>
                    <Nav.Link style={{ color: 'white' }} href='/produtos'>
                        Produtos
                    </Nav.Link>

                    <Nav.Link style={{ color: 'white' }} href='/funcionarios'>
                        Funcionarios
                    </Nav.Link>

                    <Nav.Link style={{ color: 'white' }} href='/categorias'>
                        Categorias
                    </Nav.Link>

                    <Nav.Link style={{ color: 'white' }} href='/pagamentos'>
                        Meios de Pagamento
                    </Nav.Link>
                </Nav>

                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown className='d-flex' style={{ color: 'white' }} title={usuario?.nome} id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/perfil">Perfil <FaUserCircle /></NavDropdown.Item>
                        <NavDropdown.Item href="/suporte">Suporte <FaTeamspeak /></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => {
                            fazerLogout(() => {
                                navigate("/login")
                            })
                        }}>
                            Sair <ImExit />
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Cabecalho;