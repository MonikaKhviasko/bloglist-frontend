const LogoutForm = ({
    handleLogout
}) => (
    <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
    </form>
)

export default LogoutForm