import {Client} from "pg"

export const pgProvider =[{
    provide: 'POSTGRES_CONNECTION',
    useFactory: async() => {
        const client = new Client({
            host: '',
            port:5433,
            user:'postgres',
            password:'1234',
            database:''
        });

        await client.connect();

        return client;
    }
}]