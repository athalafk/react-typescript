import FormRegister from "src/components/Fragments/FormRegister";
import AuthLayout from "src/components/Layouts/AuthLayouts";

const RegisterPage = () => {
    return (
        <AuthLayout title="Register">
            <FormRegister />
        </AuthLayout>
    )
}

export default RegisterPage;