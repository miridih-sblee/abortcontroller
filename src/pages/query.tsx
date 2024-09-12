import { useQuery } from "@tanstack/react-query";

const Query = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['test'],
        queryFn: ({signal}) => {
            return fetch('/api/hello', {signal}).then(res => res.json())
        }
    })

    return isLoading
     ? <div>Loading...</div>
     : <div> {JSON.stringify(data)}</div>
}

export default Query