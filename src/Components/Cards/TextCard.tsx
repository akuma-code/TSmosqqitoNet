
import React from 'react'
interface TextCardProps {
    text?: any[] | string;
    title?: string;
    bdr?: any[]
}
const TextCard: React.FC<TextCardProps> = ({ text, title }) => {

    return (
        <div title={title}
            style={{
                padding: "30px",
                background: "#ececec",
                width: "10rem",
                margin: "5px 5px",
                border: "1px solid black" || "none"
            }}
        >
            <hr />
            {text}
            <hr />
        </div>
    )
}

export default TextCard