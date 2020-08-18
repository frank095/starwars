import React, {useState} from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (key, greetings, page) => {
    const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json();
}

const People = () => {
    const [ page, setPage ] = useState(1);
    const { data, status } = useQuery(['people', 'SUP MOFOS', page], fetchPeople);

    console.log(data);
    return (
        <div>
            <h2>People</h2>

            <button onClick={() => setPage(1)}>Page 1</button>
            <button onClick={() => setPage(2)}>Page 2</button>
            <button onClick={() => setPage(3)}>Page 3</button>

            {status === 'success' && (
                <div>
                    {data.results.map(person => <Person key={person.name} person={person} />)}
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
export default People;