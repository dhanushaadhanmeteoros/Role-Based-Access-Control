import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    Logout
                </button>
            </div>
            <p className="text-slate-300">
                Logged in as <span className="font-semibold">{user?.username}</span> ({user?.role})
            </p>
        </div>
    );
}

export default Dashboard;