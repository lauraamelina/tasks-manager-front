import React, { useState } from 'react'
import { getUser, updateUser, setUser } from '../../services/auth/auth.service'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function PageProfile() {
    const [user, setUserP] = useState(getUser())
    const [editedUser, setEditedUser] = useState(user)
    const [isEdited, setIsEdited] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
        setIsEdited(true);
    }

    const handleSave = async () => {
        try {
            await updateUser(user.id, editedUser);
            toast.success('Perfil actualizado correctamente', {
                position: 'bottom-right',
                autoClose: 5000,
            });
            setUserP(editedUser);
            setUser(editedUser);
        } catch (error) {
            toast.error('Error al actualizar el perfil', {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    }

    return (
        <main>
            <h1>Task Manager</h1>
            <div className="card profile">
                <div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='name' id="floatingName" defaultValue={user?.name} onChange={handleChange} />
                        <label htmlFor="floatingName">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" name='email' id="floatingemail" defaultValue={user?.email} onChange={handleChange} />
                        <label htmlFor="floatingemail">Email</label>
                    </div>
                    <Link className="btn btn-secondary" to={'/list'} >
                        Volver
                    </Link>
                    <button
                        className="btn btn-primary ms-3"
                        onClick={handleSave}
                        disabled={!isEdited}
                    >
                        Guardar cambios
                    </button>
                </div>

            </div>
        </main>
    )
}