import { useEffect } from 'react';

export function useFocusRefOnBodyClick(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        const handleBodyClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                ref.current.focus();
            }
        };
        document.body.addEventListener('click', handleBodyClick);
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, [ref]);
}
