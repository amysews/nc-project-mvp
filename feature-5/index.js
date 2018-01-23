const mysql = require('promise-mysql');

mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
    .then(connection => {
        const result = connection.query("INSERT INTO people (first_name, surname, submitter, questioner, region, email, user_password, gender, dob, occupation) VALUES ('Roberto', 'Smith', 1, 0, 'Manchester', 'bob@gmail.com', 'password123', 'Male', '1990-01-01', 'Student')")
        connection.end();
        return result;
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));

