import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function InputTask() {
    const [minDate, setMinDate] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setMinDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const handleDateChange = (e) => {
        setMinDate(e.target.value);
    };

    return (
        <div className={`input-task ${isLoaded ? 'loaded' : ''}`}>
            <div className="top-section">
                <input type="text" className="form-control" placeholder="Agregar tarea..." />
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} title="Agregar tarea" />
                </button>
            </div>
            <div className="bottom-section">
                <div className="form-floating w-100">
                    <input
                        id='date'
                        type="date"
                        min={minDate}
                        className="form-control"
                        value={minDate}
                        onChange={handleDateChange}
                    />
                    <label htmlFor="date">Fecha de vencimiento</label>
                </div>
                <div className="form-floating w-100">
                    <textarea className="form-control" placeholder="Descripción" id="description"></textarea>
                    <label htmlFor="description">Descripción</label>
                </div>
            </div>
        </div>
    );
}
