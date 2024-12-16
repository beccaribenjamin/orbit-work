import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';

export const LicensesForm = ({ onSubmit, onCancel }) => {
    const {userData, createLicense} = useUser()
    const { register, handleSubmit, reset } = useForm({
        defaultValues:{
            nameEmployee: `${userData.name}`,
            user: `${userData._id}`,
            company: `${userData.company}`
        }
    });

    const onSubmitHandler = async (data) => {
        try {
            await createLicense(data); // Llama a la función del contexto
            reset();
            onSubmit(); // Si tienes lógica adicional al enviar
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const today = new Date();
    const currentYear = new Date().getFullYear();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = `${currentYear}-12-31`;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-w-md w-full p-6 rounded-md bg-gray-800">
                <h2 className="text-2xl font-semibold text-slate-100 text-center mb-6">
                    Solicitar Licencia
                </h2>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    {/* Campo Tipo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Tipo</label>
                        <select
                            {...register('type', { required: true })}
                            className="w-full p-2 mt-1 border rounded bg-gray-700 text-white"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Vacaciones">Vacaciones</option>
                            <option value="Estudio">Estudio</option>
                            <option value="Maternidad">Maternidad</option>
                            <option value="Enfermedad">Enfermedad</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    {/* Campo Fecha Inicio */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Fecha de Inicio</label>
                        <input
                            type="date"
                            {...register('startDate', { required: true })}
                            className="w-full p-2 mt-1 border rounded bg-gray-700 text-white"
                            min={minDate}
                            max={maxDate}
                        />
                    </div>

                    {/* Campo Fecha Fin */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Fecha de Fin</label>
                        <input
                            type="date"
                            {...register('endDate', { required: true })}
                            className="w-full p-2 mt-1 border rounded bg-gray-700 text-white"
                            min={minDate}
                            max={maxDate}
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Solicitar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
