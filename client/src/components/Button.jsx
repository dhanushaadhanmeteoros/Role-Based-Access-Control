// client/src/components/Button.jsx
function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-primary-container hover:bg-primary-container/90 text-on-primary-container',
    danger: 'bg-transparent border border-error text-error hover:bg-error hover:text-on-error',
    secondary: 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant',
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;