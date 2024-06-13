import React, { useState, useEffect } from 'react';
import './SearchFilter.css'

export default function SearchFilter({ states, onSearch, setSortOrder, setSortBy }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [sortOrder, setSortOrderLocal] = useState('asc'); // local state
    const [sortBy, setSortByLocal] = useState('due_date'); // local state

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch({ searchTerm, selectedStatuses, sortOrder, sortBy });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedStatuses, sortOrder, sortBy, onSearch]);

    useEffect(() => {
        const initialSelectedStatuses = states
            .filter(state => state.name !== 'Completado') // Assuming 'Completado' is the name of the completed state
            .map(state => state.status_id);

        setSelectedStatuses(initialSelectedStatuses);
    }, [states]);

    const handleStatusChange = (e) => {
        const statusId = parseInt(e.target.value);
        if (selectedStatuses.includes(statusId)) {
            setSelectedStatuses(selectedStatuses.filter(id => id !== statusId));
        } else {
            setSelectedStatuses([...selectedStatuses, statusId]);
        }
    };

    const handleSortOrderChange = (e) => {
        const newSortOrder = e.target.value;
        setSortOrderLocal(newSortOrder);
        setSortOrder(newSortOrder);
    };

    const handleSortByChange = (e) => {
        const newSortBy = e.target.value;
        setSortByLocal(newSortBy);
        setSortBy(newSortBy);
    };

    return (
        <div className="search-filter container">
            <input
                type="text"
                placeholder="Buscar por nombre o descripción"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='form-control'
            />

            <div>
                <select value={sortBy} onChange={handleSortByChange} className='form-select'>
                    <option value="due_date">Ordenar por fecha de vencimiento</option>
                    <option value="creation_date">Ordenar por fecha de creación</option>
                </select>
                <select value={sortOrder} onChange={handleSortOrderChange} className='form-select'>
                    <option value="asc">Orden ascendente</option>
                    <option value="desc">Orden descendente</option>
                </select>
            </div>
            <div className="checkbox-select">
                {states.map(state => (
                    <label key={state.status_id}>
                        <input
                            type="checkbox"
                            value={state.status_id}
                            checked={selectedStatuses.includes(state.status_id)}
                            onChange={handleStatusChange}
                        />
                        {state.name}
                    </label>
                ))}
            </div>
        </div>
    );
}
