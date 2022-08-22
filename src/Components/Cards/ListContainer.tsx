import React, { FC } from 'react'

interface ListContainerProps {
    children?: React.ReactNode[]
}

export const ListContainer: FC<ListContainerProps> = ({ children }) => {
    return (
        <ol className='col w100 collection z-depth-3 todos__list'>
            {children!.map(item => item)}
        </ol>
    )
}


// {items.map((item, idx) => (

//     <TodoCard
//         checked={item.checked}
//         numb={item.numb}
//         text={item.text}
//         key={item.numb}
//         remove={remove}
//     >
//         {item.type === 'notes' &&
//             <span className="material-icons green-text">description </span>
//         }
//         {item.type === 'cash' &&
//             <span className="material-icons red-text">attach_money</span>
//         }

//     </TodoCard>

// ))}