import React, { FC } from 'react';

interface rootProps {
    header: string;
}


const root: FC = (props) => {
    return (
        <>
        <Header active={header.active} />
        <Sidebar />
        
        
        
        </>
    )
};




export default root;