"use client";
import AuthHeader from "@/components/auth/AuthHeader/AuthHeader";
import SignupForm from "@/components/auth/SignupForm/SignupForm";
import styles from "./signup.module.css";

function SignupPage(){
    return(
        
        <div className={styles.signupPage}>
            <div className={styles.signupCard}>
                <AuthHeader title="SIGN-UP" subtitle="Create your account !!" />
                <SignupForm />
            </div>
        </div>
        
    );
}
export default SignupPage;

