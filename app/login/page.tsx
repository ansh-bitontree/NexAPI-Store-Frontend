import styles from "./login.module.css";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import AuthHeader from "../../components/auth/AuthHeader/AuthHeader";

function LoginPage(){
    return(
        
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <AuthHeader title="LOG-IN" subtitle="Welcome back !!" />
                <LoginForm />
            </div>
        </div>
        
    );
}
export default LoginPage;

