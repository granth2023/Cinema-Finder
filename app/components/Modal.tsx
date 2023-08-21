function Modal({ children, show, onClose }: any) {
if(!show) return null;

return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '1rem', zIndex: 1000 }}>
        {children}
        <button onClick={onClose}>Close</button>
    </div>
);
}

export default Modal;