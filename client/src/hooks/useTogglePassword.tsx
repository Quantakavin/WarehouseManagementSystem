import React, { useState } from 'react';

const useTogglePassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordType, setPasswordType] = useState<string>("password");
    const toggle = () => {
        setShowPassword(!showPassword);
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
        return;
    }

    return {toggle, passwordType, showPassword};
}

export default useTogglePassword;