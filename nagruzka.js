import http from 'k6/http';
import { sleep,check } from 'k6';

const sleepTime = (5);

export default function petstore()
{
    const params = 
    {
        headers: 
        {
            'Content-Type': 'application/json',
        },
    }
    let link = 'https://petstore.swagger.io/v2/pet';
    
    let pet = JSON.stringify(
    {
        "id": 333,
        "name": "DogeWoW",
        "status": "available"
    });
    
    let petUpdate = JSON.stringify(
    {
        "id": 333,
        "name": "DogeWoWNow",
        "status": "available"
    });

    const responsePost = http.post (link, pet, params);
    
    check (responsePost, {
        'POST статус код 200': (r) => r.status === 200,
    });
    sleep(sleepTime);
    
    const responsePut = http.put (link, petUpdate, params);
    
    check (responsePut, {
        'PUT статус код 200': (r) => r.status === 200,
    });
    sleep(sleepTime);

    const responseGet = http.get (link + '/333', params);
    
    check (responseGet, {
        'GET статус код 200': (r) => r.status === 200,
    });
    sleep(sleepTime);

    const responseDelete = http.del (link + '/333', params);
    
    check (responseDelete, {
        'DELETE статус код 200': (r) => r.status === 200,
    });
    sleep(sleepTime);
};
export const options = {
    stages: [
            {duration: "60s", target: 10},
            {duration: "180s", target: 10},
            {duration: "60s", target: 20},
            {duration: "130s", target: 20},
            {duration: "20s", target: 0},
        ]

}
