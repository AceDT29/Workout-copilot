import flexionesImg from '../images/flexiones.svg'
import sentadillasImg from '../images/sentadillas.svg'
import planchaImg from '../images/plancha.svg'
import pesoMuertoImg from '../images/peso-muerto.svg'

export const exercises = [
    {
        id: 1,
        name: "Flexiones",
        icon: flexionesImg,
        description: "Excelente para trabajar la fuerza de los musculos pectorales.",
        categories: ["fuerza", "pecho"],
        duration: 180,
        series: 2
    },
    {
        id: 2,
        name: "Sentadillas",
        icon: sentadillasImg,
        description: "Un ejercicio fundamental para la parte inferior del cuerpo.",
        categories: ["Calistenico", "piernas"],
        duration: 180,
        series: 2
    },
    {
        id: 3,
        name: "Plancha",
        icon: planchaImg,
        description: "Vital para fortalecer los abdominales y la zona lumbar.",
        categories: ["fuerza", "abdominales"],
        duration: 60,
        series: 2
    },
    {
        id: 4,
        name: "Peso muerto",
        icon: pesoMuertoImg,
        description: "Ejercicio intermedio para trabajar la cadena posterior del musculo de la espalda.",
        categories: ["fuerza", "Espalda"],
        duration: 180,
        series: 2
    }
]