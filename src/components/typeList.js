import React from 'react';
import Card from './type';

function TypeList ( {data, onTypeSelect} ) {
    return (
        <div>
            {
                data.map((user, i) => {
                    return (
                        <Card
                            name={data[i].name}
                            data={data[i]}
                            key={data[i].name}
                            onTypeSelect={onTypeSelect}
                        />
                    )
                })
            }
        </div>
    ) 
}

export default TypeList