import React, { useState } from "react";

function InputBox({ label, placeholder, type, onChange }) {
    return (
        <>
            <div className="text-sm font-medium text-left py-2">{label}</div>
            <input
                onChange={onChange} 
                type={type}
                placeholder={placeholder}
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </>
    );
}

export default InputBox;
