import React from 'react';

function SearchBox ( {searchChange} ) {
    return (
        <div className='pa2'>
            <input
                type='search'
                className="pa3 ba b--green bg-light-blue"
                placeholder='Search any Pokemon'
                onChange={ searchChange }
            />
        </div>
    )
}

export default SearchBox