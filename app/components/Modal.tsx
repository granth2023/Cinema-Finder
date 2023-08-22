function Modal({ children, show, onClose }: any) {
    if(!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            padding: '1rem',
            zIndex: 1000,
        }}>
            <div style={{ color: 'black' }}> {/* This style will apply to direct children, which might not necessarily be your input */}
                {children}
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default Modal;
