import React from 'react'

function Button({ type, styles, label, disabled }) {
    const inStyle = () => {
        switch (type) {
            case "primary":
                return "bg-[#6956E5] text-white p-1 rounded-md"
            case "secondary":
                return " bg-[#74BDE0] text-white border-[#74BDE0] py-1 border px-6 rounded text-[#74BDE0]"
            default:
                return ""
        }
    }

    return (
        <div>
            <button className={`${inStyle()} ${styles}`} disabled={disabled}>{label}</button>
        </div >
    )
}

export default Button
