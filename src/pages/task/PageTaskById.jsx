import React from "react";
import { useParams } from "react-router-dom";

export default function PageTaskById() {
    const { id } = useParams()
    console.log(id)
    return (
        <main>
            <h1>Task Manager</h1>

        </main>
    )
}