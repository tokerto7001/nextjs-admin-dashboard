import {db} from './src/db';

const main = async() => {
    try{
        await db.user.createMany({
            data: [
                {
                    email: 'test@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test1@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test2@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test3@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test4@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test5@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test6@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test7@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test8@test.com',
                    password: 'test',
                    isAdmin: false
                },
                {
                    email: 'test9@test.com',
                    password: 'test',
                    isAdmin: false
                },
            ],
            skipDuplicates: true
        })
    } catch(err: any) {
        console.log('Error occurred when trying to seed', err.message)
    }
}

main().catch((err) => console.log(err))