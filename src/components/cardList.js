import React from 'react';
import Card from './card';

function CardList ( {data} ) {
    return (
        <div>
            {
                data.map((user, i) => {
                    return (
                        <Card
                            name={data[i].name}
                            id={data[i].id}
                            type={data[i].types[0].type.name}
                            data={data}
                        />
                    )
                })
            }
        </div>
    )
}

export default CardList