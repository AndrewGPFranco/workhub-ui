import {reactive, computed} from 'vue';

type Language = 'pt' | 'en' | 'es';

const translations = {
    pt: {
        register: {
            title: 'Criar Conta',
            subtitle: 'Junte-se ao WorkHub para organizar seu dia.',
            firstName: 'Nome',
            fullName: 'Nome Completo',
            username: 'Username',
            email: 'E-mail',
            password: 'Senha',
            dateBirth: 'Data de Nascimento',
            button: 'Registrar',
            loading: 'Enviando...',
            error: 'Erro ao realizar registro'
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
        }
    },
    en: {
        register: {
            title: 'Create Account',
            subtitle: 'Join WorkHub to organize your day.',
            firstName: 'First Name',
            fullName: 'Full Name',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            dateBirth: 'Date of Birth',
            button: 'Register',
            loading: 'Sending...',
            error: 'Error performing registration'
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
        }
    },
    es: {
        register: {
            title: 'Crear Cuenta',
            subtitle: 'Únete a WorkHub para organizar tu día.',
            firstName: 'Nombre',
            fullName: 'Nombre Completo',
            username: 'Usuario',
            email: 'Correo electrónico',
            password: 'Contraseña',
            dateBirth: 'Fecha de nacimiento',
            button: 'Registrarse',
            loading: 'Enviando...',
            error: 'Error al realizar el registro'
        },
        validate: {
            title: 'Validar Cuenta',
            subtitle: 'Enviamos un código a',
            codeLabel: 'Código de 6 dígitos',
            button: 'Confirmar',
            loading: 'Validando...',
            success: '¡Cuenta validada con éxito! Redirigiendo...',
            error: 'Error al validar el código',
            codeLengthError: 'El código debe tener 6 dígitos.',
            resend: '¿No lo recibiste? Reenviar correo'
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
            if (current[k]) {
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
