import {z} from 'zod'

export const loginschema = z.object({
    email: z.string().email({
        message: "Por favor ingrese un correo valdio"
    }),
    password: z.string.min(6, {
        message:"La contraña debe tener al menos 6 caracteres"
    })
})