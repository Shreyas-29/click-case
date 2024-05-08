import { Steps, Wrapper } from "@/components";
import React from 'react'

interface Props {
    children: React.ReactNode;
}

const ConfigureLayout = ({ children }: Props) => {
    return (
        <Wrapper className="flex flex-col flex-1">
            <Steps />
            {children}
        </Wrapper>
    )
};

export default ConfigureLayout
