import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

function ErrorFallback({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    );
}

function ErrorBoundary({ children }) {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error) => {
                toast.error(`Error: ${error.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
}

export default ErrorBoundary;
