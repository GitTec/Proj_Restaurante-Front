import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { FaUser, FaLock } from 'react-icons/fa'
//@ts-ignore
import styles from './login.module.css';

export function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const { fazerLogin } = useAuth();

    return <section className={styles.conteudo}>
        <div className={styles.formbox}>
            <div className={styles.formvalue}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    fazerLogin(email, senha, () => {
                        navigate("/")
                    })
                }}>
                    <h2 className={styles.title}>Login</h2>
                    <div className={styles.inputbox}>
                        <FaUser className={styles.icon} />
                        <input type="email" value={email} onChange={event => setEmail(event.target.value)} required />
                        <label >Email</label>
                    </div>
                    <div className={styles.inputbox}>
                        <FaLock className={styles.icon} />
                        <input type="password" value={senha} onChange={event => setSenha(event.target.value)} required />
                        <label>Senha</label>
                    </div>
                    <div className={styles.forget}>
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                    <button className={styles.buttonLogin} type='submit'>Entrar</button>
                    <div className={styles.register}>
                        <p>Não tenho conta <a href="#">Registrar</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section >
}