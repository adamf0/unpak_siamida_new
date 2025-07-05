const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(i)}>
                    {i}
                </button>
            </li>
        );
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
                </li>

                {pages}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
