import { Suspense } from "react";

interface ICustomSuspenseProps {
    children?: any
}

const CustomSuspense: React.FC<ICustomSuspenseProps> = (props) => {
    return <Suspense fallback={<div className="d-flex justify-content-center mt-3">Loading...</div>}>
        {props?.children}
    </Suspense>
}

export default CustomSuspense;
