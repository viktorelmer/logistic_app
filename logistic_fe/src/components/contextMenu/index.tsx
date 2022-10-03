import React, { useCallback, useEffect } from "react";

import styled from 'styled-components'

interface Props {
    anchorPoints: {x: number, y: number};
    show: boolean;
    cbData?: any,
    items: {id: number, text: string, cb: (id: number, data?: any) => void}[]
}

const ContextMenu:React.FunctionComponent<Props> = ({anchorPoints, show, items, cbData}) => {

    const ContextWrapper = styled.ul`
        left: ${anchorPoints.x}px;
        top: ${anchorPoints.y}px;
        font-size: 14px;
        background-color: #fff;
        border-radius: 2px;
        padding: 5px 0 5px 0;
        width: 150px;
        height: auto;
        margin: 0;
        position: absolute;
        list-style: none;
        box-shadow: 0 0 20px 0 #ccc;
        opacity: 1;
        transition: opacity 0.5s linear;
        z-index: 999999;

    `;

    return show && (
        <ContextWrapper>
            {items.map(item => 
                <li className="hover:bg-slate-200 transition" key={item.id} onClick={() => {
                    item.cb(item.id, cbData)
                }}>{item.text}</li>    
            )}
        </ContextWrapper>
    )
}


export default ContextMenu