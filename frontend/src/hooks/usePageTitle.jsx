import React, { useEffect } from 'react'

const usePageTitle = ({title}) => {
    useEffect(() => {
        document.title = `${title} | Campus Vendor`;
        window.scrollTo(0, 0);
    }, [title]);

    return null;
}

export default usePageTitle