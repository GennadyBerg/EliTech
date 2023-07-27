

const MainLayout = ({ children }) => {
    return (
        <div>
            <div style={{ display: 'flex', gap: '30px' }}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
