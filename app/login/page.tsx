"use client";
import AuthHeader from "@/components/auth/AuthHeader/AuthHeader";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import styles from "./login.module.css";

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

