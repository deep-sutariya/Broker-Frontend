import React from 'react';

const SortButtonWrapper = ({ sortOption, setSortOption, sortOrder, setSortOrder }) => {
    const handleSortChange = (selectedSortOption) => {
        setSortOption(selectedSortOption);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="flex justify-center items-center gap-x-4 w-[90%] sm:w-[75%] md:w-[50%]">
            <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-1 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm focus:outline-none"
            >
                <option value="date" className='text-xs sm:text-sm p-0'>Sort by Date</option>
                <option value="fullpaid" className='text-xs sm:text-sm'>Full Paid</option>
                <option value="brokerage" className='text-xs sm:text-sm'>Brokerage Unpaid</option>
                <option value="notpaid" className='text-xs sm:text-sm'>Unpaid</option>
                <option value="pendingAmount" className='text-xs sm:text-sm'>Sort by Pending Amount</option>
                <option value="dueDay" className='text-xs sm:text-sm'>Sort by Due Day</option>
                <option value="totalAmount" className='text-xs sm:text-sm'>Sort by Total Amount</option>
            </select>

            <button
                onClick={handleSortOrderChange}
                className="text-xs sm:text-sm text-common focus:outline-none bg-blue px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
            >
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
        </div>
    );
};

export default SortButtonWrapper;
