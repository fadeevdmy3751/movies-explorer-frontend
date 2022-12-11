import {useEffect} from 'react';

export default function useEscapePress(callback, dependency) {
    useEffect(() => {
        if (dependency) {
            const onEscClose = e => {
                if (e.key === 'Escape') {
                    callback()
                }
            }
            document.addEventListener('keyup', onEscClose);
            // удалим обработчик при размонтировании
            return () => {
                document.removeEventListener('keyup', onEscClose)
            };
        }
    }, [dependency, callback])
}
