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
                    duration: 23716,
                    imageName: 'javascript.png'
                },
                {
                    title: 'Typescript',
                    description: 'Comprehend the spectacular world of Typescript and how it is created as a superset of Javascript.',
                    duration: 12872,
                    imageName: 'typescript.jpg'
                },
                {
                    title: 'Nodejs',
                    description: 'Comprehend the spectacular world of Nodejs and how to create a web server listening for requests.',
                    duration: 31283,
                    imageName: 'nextjs.png'
                }
            ],
            skipDuplicates: true
        });

        await db.userCourses.createMany({
            data: [
                {
                    userId: 1,
                    courseId: 1,
                    isCompleted: false
                },
                {
                    userId: 1,
                    courseId: 2,
                    isCompleted: false
                },
                {
                    userId: 1,
                    courseId: 3,
                    isCompleted: true
                },
                {
                    userId: 2,
                    courseId: 1,
                    isCompleted: false
                },
                {
                    userId: 2,
                    courseId: 3,
                    isCompleted: false
                },
                {
                    userId: 3,
                    courseId: 1,
                    isCompleted: false
                },
                {
                    userId: 3,
                    courseId: 3,
                    isCompleted: false
                },
                {
                    userId: 4,
                    courseId: 2,
                    isCompleted: false
                },
                {
                    userId: 4,
                    courseId: 3,
                    isCompleted: false
                },
                {
                    userId: 7,
                    courseId: 2,
                    isCompleted: false
                },
                {
                    userId: 8,
                    courseId: 3,
                    isCompleted: false
                },
                {
                    userId: 9,
                    courseId: 1,
                    isCompleted: false
                },
                {
                    userId: 10,
                    courseId: 3,
                    isCompleted: true
                },
            ],
            skipDuplicates: true
        })
    } catch(err: any) {
        console.log('Error occurred when trying to seed', err.message)
    }
}

main().catch((err) => console.log(err))