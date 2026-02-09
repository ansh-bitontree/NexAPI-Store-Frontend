import "./AuthHeader.css"

type AuthHeaderProps = {
    title: string;
    subtitle: string;
}

function AuthHeader({title, subtitle}:  AuthHeaderProps){

    return(
        <div className='auth-header'>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}

export default AuthHeader