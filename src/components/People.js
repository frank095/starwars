import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
    const res = await fetch('http://swapi.dev/api/people/');
    return res.json();
}

const People = () => {
    const { data, status } = useQuery('people', fetchPeople);

    console.log(data);
    return (
        <div>
            <h2>People</h2>
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