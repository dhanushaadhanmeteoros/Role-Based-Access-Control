import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

function Forbidden() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center bg-surface font-sans px-6">
            <div className="w-full max-w-sm text-center">
                <p className="font-mono text-xs tracking-wider text-error uppercase mb-2">
                    Error 403
                </p>
                <h1 className="text-2xl font-serif font-semibold text-on-surface mb-2">
                    Access Denied
                </h1>
                <p className="text-on-surface-variant text-sm mb-6">
                    {user
                        ? `Your role (${user.role}) doesn't have permission to view this page.`
                        : "You don't have permission to view this page."}
                </p>
                <Button className="w-full" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
}

export default Forbidden;