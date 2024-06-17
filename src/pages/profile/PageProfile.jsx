import React, { useState } from 'react'
import { getUser } from '../../services/auth/auth.service'

export default function PageProfile() {
    const [user] = useState(getUser())
    return (
        <main>
            <h1>Task Manager</h1>
            <div className="card profile">
                <form action="">
                    <div className="form-floating mb-3">
                        <input type="name" className="form-control" id="floatingName" defaultValue={user?.name} />
                        <label htmlFor="floatingName">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingemail" defaultValue={user?.email} />
                        <label htmlFor="floatingemail">Email</label>
                    </div>
                </form>

            </div>
        </main>
    )
}