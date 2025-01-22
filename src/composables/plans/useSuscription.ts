import { api } from '@/api/axios';
import { useQuery } from '@tanstack/vue-query';

const getRucsInfo = async (): Promise<any> => {
    const {data} = await api.get('/suscription');
    return data;
}

const useSuscription = () => {
    const {data, isError } = useQuery({
        queryKey: ['suscription'],
        queryFn: getRucsInfo
    });

    return{
        suscription: data,
        suscriptionHasError: isError,
    }
}

export default useSuscription;
