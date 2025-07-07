import FormLogin from "src/components/Fragments/FormLogin";
import AuthLayout from "src/components/Layouts/AuthLayouts";

const LoginPage = () => {
    return (
        <AuthLayout title="Login">
            <FormLogin />
        </AuthLayout>
    )
}

export default LoginPage;