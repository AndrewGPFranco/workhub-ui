import {reactive, computed} from 'vue';

type Language = 'pt' | 'en' | 'es';

const translations = {
    pt: {
        brand: {
            description: 'Eleve sua produtividade com nossa plataforma de gerenciamento de trabalho de última geração. Simplifique tarefas, colabore perfeitamente e conquiste mais.',
            welcomeBack: 'Bem-vindo de volta! Acesse seu painel profissional para se manter produtivo e organizado.',
            validateDescription: 'A segurança é nossa prioridade. Insira o código de verificação enviado para sua caixa de entrada para finalizar seu registro.'
        },
        register: {
            title: 'Criar Conta',
            subtitle: 'Junte-se ao WorkHub para organizar seu dia.',
            firstName: 'Nome',
            fullName: 'Nome Completo',
            username: 'Username',
            email: 'E-mail',
            password: 'Senha',
            confirmPassword: 'Confirmar Senha',
            dateBirth: 'Data de Nascimento',
            button: 'Registrar',
            loading: 'Enviando...',
            error: 'Erro ao realizar registro',
            passwordMismatch: 'As senhas não coincidem',
            alreadyHaveAccount: 'Já tem uma conta?',
            loginLink: 'Faça login'
        },
        login: {
            title: 'Entrar',
            subtitle: 'Acesse seu painel para gerenciar suas tarefas.',
            usernameOrEmail: 'Username ou E-mail',
            password: 'Senha',
            button: 'Entrar',
            loading: 'Autenticando...',
            error: 'Usuário ou senha inválidos',
            noAccount: 'Não tem uma conta?',
            registerLink: 'Criar uma conta'
        },
        validate: {
            title: 'Validar Conta',
            subtitle: 'Enviamos um código para',
            codeLabel: 'Código de 6 dígitos',
            button: 'Confirmar',
            loading: 'Validando...',
            success: 'Conta validada com sucesso! Redirecionando...',
            error: 'Erro ao validar código',
            codeLengthError: 'O código deve ter 6 dígitos.',
            resend: 'Não recebeu? Reenviar e-mail'
        },
        home: {
            welcome: 'Bem-vindo ao seu WorkHub',
            subtitle: 'Onde a produtividade encontra a organização.',
            logout: 'Sair'
        }
    },
    en: {
        brand: {
            description: 'Elevate your productivity with our next-generation work management platform. Streamline tasks, collaborate seamlessly, and achieve more.',
            welcomeBack: 'Welcome back! Access your professional dashboard to stay productive and organized.',
            validateDescription: 'Security is our top priority. Please enter the verification code sent to your inbox to finalize your registration.'
        },
        register: {
            title: 'Create Account',
            subtitle: 'Join WorkHub to organize your day.',
            firstName: 'First Name',
            fullName: 'Full Name',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            dateBirth: 'Date of Birth',
            button: 'Register',
            loading: 'Sending...',
            error: 'Error performing registration',
            passwordMismatch: 'Passwords do not match',
            alreadyHaveAccount: 'Already have an account?',
            loginLink: 'Sign in'
        },
        login: {
            title: 'Sign In',
            subtitle: 'Access your dashboard to manage your tasks.',
            usernameOrEmail: 'Username or Email',
            password: 'Password',
            button: 'Sign In',
            loading: 'Authenticating...',
            error: 'Invalid username or password',
            noAccount: "Don't have an account?",
            registerLink: 'Create an account'
        },
        validate: {
            title: 'Validate Account',
            subtitle: 'We sent a code to',
            codeLabel: '6-digit code',
            button: 'Confirm',
            loading: 'Validating...',
            success: 'Account validated successfully! Redirecting...',
            error: 'Error validating code',
            codeLengthError: 'The code must be 6 digits.',
            resend: "Didn't receive it? Resend email"
        },
        home: {
            welcome: 'Welcome to your WorkHub',
            subtitle: 'Where productivity meets organization.',
            logout: 'Logout'
        }
    },
    es: {
        brand: {
            description: 'Eleve su productividad con nuestra plataforma de gestión del trabajo de última generación. Simplifique las tareas, colabore sin problemas y logre más.',
            welcomeBack: '¡Bienvenido de nuevo! Acceda a su panel profesional para mantenerse productivo y organizado.',
            validateDescription: 'La seguridad es nuestra prioridad. Ingrese el código de verificación enviado a su bandeja de entrada para finalizar su registro.'
        },
        register: {
            title: 'Crear Cuenta',
            subtitle: 'Únete a WorkHub para organizar tu día.',
            firstName: 'Nombre',
            fullName: 'Nombre Completo',
            username: 'Usuario',
            email: 'Correo electrónico',
            password: 'Contraseña',
            confirmPassword: 'Confirmar Contraseña',
            dateBirth: 'Fecha de nacimiento',
            button: 'Registrarse',
            loading: 'Enviando...',
            error: 'Error al realizar el registro',
            passwordMismatch: 'Las contraseñas no coinciden',
            alreadyHaveAccount: '¿Ya tienes una cuenta?',
            loginLink: 'Inicia sesión'
        },
        login: {
            title: 'Iniciar Sesión',
            subtitle: 'Acceda a su tablero para gestionar sus tareas.',
            usernameOrEmail: 'Usuario o Correo',
            password: 'Contraseña',
            button: 'Entrar',
            loading: 'Autenticando...',
            error: 'Usuario o contraseña inválidos',
            noAccount: '¿No tienes una cuenta?',
            registerLink: 'Crea una cuenta'
        },
        validate: {
            title: 'Validar Conta',
            subtitle: 'Enviamos un código a',
            codeLabel: 'Código de 6 dígitos',
            button: 'Confirmar',
            loading: 'Validando...',
            success: '¡Cuenta validada con éxito! Redirigiendo...',
            error: 'Error al validar el código',
            codeLengthError: 'El código debe tener 6 dígitos.',
            resend: '¿No lo recibiste? Reenviar correo'
        },
        home: {
            welcome: 'Bienvenido a su WorkHub',
            subtitle: 'Donde la productividad se une a la organización.',
            logout: 'Cerrar sesión'
        }
    }
};

const state = reactive({
    locale: (localStorage.getItem('locale') as Language) || 'pt'
});

export const i18n = {
    locale: computed(() => state.locale),
    t: (key: string) => {
        const keys = key.split('.');
        let current: any = translations[state.locale];
        for (const k of keys) {
            if (current && current[k]) {
                current = current[k];
            } else {
                return key;
            }
        }
        return current;
    },
    setLocale: (locale: Language) => {
        state.locale = locale;
        localStorage.setItem('locale', locale);
    }
};
