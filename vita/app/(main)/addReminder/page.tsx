'use client'
import React, { useState } from 'react';

const AddReminderPage = () => {
    const [formData, setFormData] = useState({
        description: '',
        numHours: '',
        numDays: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
    });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(formData);  // Log the form data or handle submission
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Crea un Recordatorio</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label>
                    Descripción:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <label>
                        Numero de horas:
                        <input
                            type="number"
                            name="numHours"
                            value={formData.numHours}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Número de días:
                        <input
                            type="number"
                            name="numDays"
                            value={formData.numDays}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <label>
                        Fecha de Inicio:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Hora de Inicio:
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <label>
                        Fecha de Fin:
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Hora de Fin:
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Crear Recordatorio</button>
            </form>
        </div>
    );
};

export default AddReminderPage;