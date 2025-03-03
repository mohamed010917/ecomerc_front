export default function Pagint(props){
    function handlePageChange(page) {
        props.setpage(page);
      }
    return(
        <nav className="flex items-center p-4 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{props.meta.current_page}-{props.meta.last_page}</span> of <span className="font-semibold text-gray-900 dark:text-white">{props.meta.total}</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <button  className={`flex items-center justify-center ${props.page === 1 ? 'hidden' : 'block'} px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={() => handlePageChange(props.page - 1)}>Previous</button>
            </li>
            {Array.from({ length: props.meta.last_page }, (p, i) => (
              <li key={i + 1}>
                <button
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 
                            hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                            dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
         
            <li>
                <button  className={`flex items-center justify-center ${props.page === props.meta.last_page ? 'hidden' : 'block'} px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={() => handlePageChange(props.page + 1)}>Next</button>
            </li>
        </ul>
    </nav>
    );
}