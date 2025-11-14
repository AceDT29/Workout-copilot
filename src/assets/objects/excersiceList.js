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
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        name: "Flexiones",
        icon: flexionesImg,
        description: "Excelente para trabajar la fuerza de los musculos pectorales.",
        categories: ["Calistenico", "pecho"],
        duration: 180,
        series: 2
    },
    {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        name: "Sentadillas",
        icon: sentadillasImg,
        description: "Un ejercicio fundamental para la parte inferior del cuerpo.",
        categories: ["Calistenico", "piernas"],
        duration: 180,
        series: 2
    },
    {
        id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
        name: "Plancha",
        icon: planchaImg,
        description: "Ejercicio basico para fortalecer los abdominales y la zona lumbar.",
        categories: ["Calistenico", "abdominales"],
        duration: 60,
        series: 2
    },
    {
        id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
        name: "Peso muerto",
        icon: pesoMuertoImg,
        description: "Ejercicio Avanzado para trabajar la cadena posterior del musculo de la espalda.",
        categories: ["fuerza", "Espalda", "brazos"],
        duration: 180,
        series: 2
    },
    {
        id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        name: "Plancha lateral",
        icon: planchaLateralImg,
        description: "Ejercicio avanzado, trabaja muchas zonas del cuerpo con enfasis en el abdomen",
        categories: ["fuerza", "abdominales"],
        duration: 120,
        series: 2
    },
    {
        id: "1b4f0e9851971998e732078544c11c82",
        name: "Abdominales",
        icon: abdominalesImg,
        description: "Ejercicio basico para comenzar a trabajar la zona abdominal.",
        categories: ["Calistenico", "abdominales"],
        duration: 100,
        series: 3
    },
    {
        id: "9b59b88d-1234-5678-9abc-def012345678",
        name: "Burpee",
        icon: burpeeImg,
        description: "Ejercicio intermedio que trabaja todos los musculos inferiores al abdomen (Incluyendo las piernas).",
        categories: ["Calistenico", "piernas", "abdominales"],
        duration: 60,
        series: 3
    },
    {
        id: "c3589d2f-abcd-4e56-89ab-cdef01234567",
        name: "Pull-up",
        icon: dominadasImg,
        description: "Ejercicio intermedio, Clave en la generacion de fuerza y volumen de toda la zona pectoral, triceps y biceps.",
        categories: ["Calistenico", "Fuerza", "pecho", "brazos"],
        duration: 30,
        series: 3
    }, 
    {
        id: "d7f8c9e2-bcde-4f67-9abc-def012345678",
        name: "Flexion con kettlebell",
        icon: kettlebellImg,
        description: "Ejercicio intermedio, requiere dominio previo de los tipos de flexiones mas basicos",
        categories: ["Fuerza", "pecho"],
        duration: 80,
        series: 2
    },
    {
        id: "e8a9d0f3-cdef-50ab-8bcd-ef0123456789",
        name: "Press doble",
        icon: pressDoblesImg,
        description: "Ejercicio basico para generar musculo y mucha fuerza en los hombros y triceps.",
        categories: ["Fuerza", "brazos"],
        duration: 30,
        series: 3
    },
    {
        id: "f9b0e1f4-def0-51bc-9cde-f01234567890",
        name: "Press militar",
        icon: pressMilitarImg,
        description: "Ejercicio avanzado, requiere de bastante fuerza fisica y resistencia dependiendo del peso",
        categories: ["Fuerza", "brazos", "pecho"],
        duration: 20,
        series: 2
    },
    {
        id: "1a2b3c4d-5e6f-7890-abcd-ef1234567890",
        name: "Triceps",
        icon: triceps,
        description: "Ejercicio basico para brazos, muy recomendado antes de empezar otros ejercicios mas exigentes",
        categories: ["Calistenico", "brazos"],
        duration: 40,
        series: 2
    },
    {
        id: "2b3c4d5e-6f78-90ab-cdef-1234567890ab",
        name: "Zancada con peso",
        icon: zancadaPesoImg,
        description: "Ejercicio Intermedio, no tan dificil en ejecucion pero requiere dominio en la postura para evitar lesiones",
        categories: ["Fuerza", "piernas", "brazos"],
        duration: 40,
        series: 2
    },
    {
        id: "3c4d5e6f-7890-abcd-ef12-34567890abcd",
        name: "Sentadilla con peso",
        icon: sentadillaPeso,
        description: "Ejercicio Intermedio, importante adoptar una postura adecuada para evitar lesiones",
        categories: ["Fuerza", "piernas"],
        duration: 30,
        series: 2
    }
]