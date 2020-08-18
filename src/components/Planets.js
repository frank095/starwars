import React, {useState} from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, greetings, page) => {
    console.log(greetings);
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [ page, setPage ] = useState(1);
    const { data, status } = useQuery(['planets', 'HELLO MOFOS', page], fetchPlanets, {
        staleTime: 0,
        cacheTime: 10,
        onSuccess: () => console.log('data fetched with no problemo.'),
    });

    console.log(data);
    return (
        <div>
            <h2>Planets</h2>

            <button onClick={() => setPage(1)}>Page 1</button>
            <button onClick={() => setPage(2)}>Page 2</button>
            <button onClick={() => setPage(3)}>Page 3</button>

            {status === 'success' && (
                <div>
                    {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                </div>
            )}
            {status === 'loading' && (
                <div>LOADING DATA</div>
            )}
            {status === 'error' && (
                <div>ERROR FETCHING DATA</div>
            )}
        </div>
    );
}
export default Planets;