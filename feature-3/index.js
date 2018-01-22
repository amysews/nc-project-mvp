// require ('dotenv').config()

const sendQuestionToServer = (event) => {
    event.preventDefault()
    const question = event.target.question.value
    const fileName = event.target.fileName.value

    return fetch('/s3/upload', {
        method: 'PUT',
        body: JSON.stringify({ question, fileName }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(buffer => buffer.json())
        .catch(err => {
            console.log(err)
        })
}

document.getElementById('questionInput').addEventListener('submit', sendQuestionToServer)





// console.log(process.env.AWS_ACCESS_KEY_ID)