import React, { Component } from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        toast.error('Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Ocurrió un error inesperado.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
