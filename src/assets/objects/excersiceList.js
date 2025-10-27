import flexionesImg from '../images/flexiones.svg'
import sentadillasImg from '../images/sentadillas.svg'
import planchaImg from '../images/plancha.svg'
import pesoMuertoImg from '../images/peso-muerto.svg'
import planchaLateralImg from '../images/plancha-lateral.svg'
import abdominalesImg from '../images/Abdominales.svg'
import burpeeImg from '../images/burpee.svg'
import dominadasImg from '../images/dominadas.svg'
import kettlebellImg from '../images/kettlebell.svg'
import pressDoblesImg from '../images/press-doble.svg'
import pressMilitarImg from '../images/press-militar.svg'
import triceps from '../images/triceps.svg'
import zancadaPesoImg from '../images/zancada-peso.svg'
import sentadillaPeso from '../images/sentadilla-peso.svg'


export const exercises = [
    {
        id: 1,
        name: "Flexiones",
        icon: flexionesImg,
        description: "Excelente para trabajar la fuerza de los musculos pectorales.",
        categories: ["Calistenico", "pecho"],
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
        description: "Ejercicio basico para fortalecer los abdominales y la zona lumbar.",
        categories: ["Calistenico", "abdominales"],
        duration: 60,
        series: 2
    },
    {
        id: 4,
        name: "Peso muerto",
        icon: pesoMuertoImg,
        description: "Ejercicio Avanzado para trabajar la cadena posterior del musculo de la espalda.",
        categories: ["fuerza", "Espalda", "brazos"],
        duration: 180,
        series: 2
    },
    {
        id: 5,
        name: "Plancha lateral",
        icon: planchaLateralImg,
        description: "Ejercicio avanzado, trabaja muchas zonas del cuerpo con enfasis en el abdomen",
        categories: ["fuerza", "abdominales"],
        duration: 120,
        series: 2
    },
    {
        id: 6,
        name: "Abdominales",
        icon: abdominalesImg,
        description: "Ejercicio basico para comenzar a trabajar la zona abdominal.",
        categories: ["Calistenico", "abdominales"],
        duration: 100,
        series: 3
    },
    {
        id: 7,
        name: "Burpee",
        icon: burpeeImg,
        description: "Ejercicio intermedio que trabaja todos los musculos inferiores al abdomen (Incluyendo las piernas).",
        categories: ["Calistenico", "piernas", "abdominales"],
        duration: 60,
        series: 3
    },
    {
        id: 8,
        name: "Pull-up",
        icon: dominadasImg,
        description: "Ejercicio intermedio, Clave en la generacion de fuerza y volumen de toda la zona pectoral, triceps y biceps.",
        categories: ["Calistenico", "Fuerza", "pecho", "brazos"],
        duration: 30,
        series: 3
    }, 
    {
        id: 9,
        name: "Flexion con kettlebell",
        icon: kettlebellImg,
        description: "Ejercicio intermedio, requiere dominio previo de los tipos de flexiones mas basicos",
        categories: ["Fuerza", "pecho"],
        duration: 80,
        series: 2
    },
    {
        id: 10,
        name: "Press doble",
        icon: pressDoblesImg,
        description: "Ejercicio basico para generar musculo y mucha fuerza en los hombros y triceps.",
        categories: ["Fuerza", "brazos"],
        duration: 30,
        series: 3
    },
    {
        id: 11,
        name: "Press militar",
        icon: pressMilitarImg,
        description: "Ejercicio avanzado, requiere de bastante fuerza fisica y resistencia dependiendo del peso",
        categories: ["Fuerza", "brazos", "pecho"],
        duration: 20,
        series: 2
    },
    {
        id: 12,
        name: "Triceps",
        icon: triceps,
        description: "Ejercicio basico para brazos, muy recomendado antes de empezar otros ejercicios mas exigentes",
        categories: ["Calistenico", "brazos"],
        duration: 40,
        series: 2
    },
    {
        id: 13,
        name: "Zancada con peso",
        icon: zancadaPesoImg,
        description: "Ejercicio Intermedio, no tan dificil en ejecucion pero requiere dominio en la postura para evitar lesiones",
        categories: ["Fuerza", "piernas", "brazos"],
        duration: 40,
        series: 2
    },
    {
        id: 14,
        name: "Sentadilla con peso",
        icon: sentadillaPeso,
        description: "Ejercicio Intermedio, importante adoptar una postura adecuada para evitar lesiones",
        categories: ["Fuerza", "piernas"],
        duration: 30,
        series: 2
    }
]