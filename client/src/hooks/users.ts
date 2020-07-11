import {
    useState,
    useEffect,
} from 'react'
import axios from 'axios'

export const useMe = (): any => {
    const [me, setMe] = useState()

    useEffect((): void => {
        if (me) {
            return
        }

        axios.get('/api/users/me')
            .then((response: any) => {
                setMe(response.data)
            }).catch((e) => {
                console.log('Failed to load the current user', e)
                setMe(e)
                throw e
            });
    }, [me])

    return [me]
};
