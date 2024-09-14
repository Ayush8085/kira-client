import { AuthForm } from "@/components/core/AuthForm"

export const Login = () => {
    return (
        <div>
            <AuthForm h1_text="Access your account" description="Enter your credentials to access your account" btn_text="Sign In with Email" form_type="login" />
        </div>
    )
}
