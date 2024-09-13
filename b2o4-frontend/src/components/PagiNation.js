import './css/Pagination.css';

const Pagination = ({itemPerPage, totalItems, paginate, currentPage}) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemPerPage); 
    for(let i = 1; i <= totalPages ; i++){
        pageNumbers.push(i); 
    }
    const renderPageNumber = () => {
        if(totalPages <= 10){
            return pageNumbers;
        }

        const startPage = Math.max(1, currentPage - 5);

        const endPage = Math.min(totalPages, currentPage + 4);

        return pageNumbers.slice(startPage - 1, endPage);
    
    
    }

    return (
        <nav>
            <ul className='pagination'>
                {currentPage > 1    && (
                    <li>
                        <a onClick={() => paginate(currentPage-1)} href='#' className='page-link'>
                            &laquo;
                        </a>
                    </li>
                )}

                {renderPageNumber().map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' :''}`}> 
                        <a onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                {currentPage < totalPages && ( 
                    <li>
                        <a onClick={() => paginate(currentPage +1)} href='#' className='page-link'>
                            &raquo;
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Pagination;
