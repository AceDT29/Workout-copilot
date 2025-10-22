import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useHandleAuth() {
    const [showExcep, setShowExcep] = useState(false);
    const [excepResult, setExcepResult] = useState([]);
    const navigate = useNavigate();

    function validateFields(inputEmail, inputPass) {
        const patternValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let confirmValue = false;
        let emailValue = inputEmail.value;
        let passValue = inputPass.value;

        if (patternValid.test(emailValue.trim())) {
            inputEmail.style.borderColor = "green";
        } else {
            inputEmail.style.borderColor = "red";
        }

        if (passValue.trim().length < 8) {
            inputPass.style.borderColor = "red";
            inputPass.nextElementSibling.textContent = "La contraseña es muy corta";
        } else {
            inputPass.style.borderColor = "green";
            inputPass.nextElementSibling.textContent = "";
        }
        confirmValue = patternValid.test(emailValue) && passValue.length >= 8;
        return confirmValue
    };


    function generateMessage(code, message) {
        const newMsg = {
            code,
            message
        };
        return newMsg;
    }

    function errorHandler(err) {
        let errValue;
        const message = typeof err === 'string' ? err : (err.message || '');
        switch (message) {
            case 'Invalid login credentials':
                errValue = generateMessage(400, 'Email y/o contraseña incorrectos (intenta revisar el correo y confirmar tu cuenta)');
                break;
            case 'User already registered': 
                errValue = generateMessage(409, 'Este usuario ya ha sido registrado en Workout copilot');
                break;
            case 'Network request failed':
                errValue = generateMessage(404, 'Error de red al procesar tu solicitud');
                break;
            case 'The popup was closed by the user':
                errValue = generateMessage(499, 'El popup fue cerrado antes de completar la autenticación');
                break;
            default:
                errValue = generateMessage(500, 'Ha ocurrido un error inesperado. Inténtalo de nuevo.');
                break;
        }
        setExcepResult([errValue]);
        setShowExcep(true);
    }

    return {
        validateFields,
        showExcep,
        setShowExcep,
        excepResult,
        errorHandler,
        navigate
    };
}