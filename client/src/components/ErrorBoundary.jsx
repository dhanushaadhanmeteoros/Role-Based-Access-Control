import { Component } from 'react';
import Button from './Button';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Unhandled UI error:', error, info);
    }

    handleReload = () => {
        this.setState({ hasError: false });
        window.location.href = '/dashboard';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen flex items-center justify-center bg-surface font-sans px-6">
                    <div className="w-full max-w-sm text-center">
                        <p className="font-mono text-xs tracking-wider text-error uppercase mb-2">
                            Unexpected Error
                        </p>
                        <h1 className="text-2xl font-serif font-semibold text-on-surface mb-2">
                            Something went wrong
                        </h1>
                        <p className="text-on-surface-variant text-sm mb-6">
                            An unexpected error occurred while rendering this page. Try returning to the dashboard.
                        </p>
                        <Button className="w-full" onClick={this.handleReload}>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 