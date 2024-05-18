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
        });

        await db.course.createMany({
            data: [
                {
                    title: 'Javascript',
                    description: 'Comprehend the spectacular world of Javascript and its asyncronous arthitecture.',
                    duration: 237162
                },
                {
                    title: 'Typescript',
                    description: 'Comprehend the spectacular world of Typescript and how it is created as a superset of Javascript.',
                    duration: 128721
                },
                {
                    title: 'Nodejs',
                    description: 'Comprehend the spectacular world of Nodejs and how to create a web server listening for requests.',
                    duration: 312836
                }
            ],
            skipDuplicates: true
        });
    } catch(err: any) {
        console.log('Error occurred when trying to seed', err.message)
    }
}

main().catch((err) => console.log(err))