import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";

export const RegisterEmployee = ({ initialValues, setShow }) => {
    const { registerUser, editUser } = useUser();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            position: "",
            area: "",
        },
    });

    useEffect(() => {
        // Rellena el formulario si se están editando valores
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const onSubmit = async (data) => {
        try {
            if (initialValues) {
                await editUser(initialValues._id, data); // Edición
            } else {
                await registerUser(data); // Creación
            }
            reset();
            setShow(false); // Cierra el formulario
        } catch (error) {
            console.error("Error al guardar empleado:", error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="max-w-md w-full p-10 rounded-2xl bg-gray-800">
                <h2 className="text-2xl font-semibold text-slate-100 text-center mb-10">
                    {initialValues ? "Actualizar Usuario" : "Registrar Usuario"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-white">Nombre y Apellido</label>
                    <input
                        type="text"
                        className="w-full bg-zinc-100 px-4 py-2 my-2 rounded-md"
                        placeholder="Nombre y Apellido"
                        {...register("name")}
                    />
                    <label className="text-white">Email</label>
                    <input
                        type="email"
                        className="w-full bg-zinc-100 px-4 py-2 my-2 rounded-md"
                        placeholder="correo@mail.com"
                        {...register("email")}
                    />
                    {!initialValues && (
                        <>
                            <label className="text-white">Contraseña</label>
                            <input
                                type="password"
                                className="w-full bg-zinc-100 px-4 py-2 my-2 rounded-md"
                                placeholder="*******"
                                {...register("password")}
                            />
                        </>
                    )}
                    <label className="text-white">Puesto / Posición</label>
                    <input
                        type="text"
                        className="w-full bg-zinc-100 px-4 py-2 my-2 rounded-md"
                        placeholder="Puesto"
                        {...register("position")}
                    />
                    <label className="text-white">Área/Departamento</label>
                    <input
                        type="text"
                        className="w-full bg-zinc-100 px-4 py-2 my-2 rounded-md"
                        placeholder="Área"
                        {...register("area")}
                    />
                    <label className="text-white">Rol</label>
                    <select
                        className="w-full bg-zinc-100 px-4 py-2 my-2 rounded-md"
                        {...register("role")}
                    >
                        <option value="employee">Empleado</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full h-10 mt-4 px-4 rounded-md bg-green-500 text-white font-semibold"
                    >
                        {initialValues ? "Actualizar" : "Registrar"}
                    </button>
                    <button
                        type="button"
                        className="w-full h-10 mt-4 px-4 bg-red-400 hover:bg-red-600 rounded-md text-white font-semibold"
                        onClick={() => setShow(false)}
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};
