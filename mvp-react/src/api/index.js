const API_URL = 'http://localhost:3002'

export const postTopicMetadata = (topic, user_id) => {
  return fetch(`${API_URL}/rds/questions`, {
    method: 'PUT',
    body: JSON.stringify({ user_id, topic, keywords: topic, answered: 1 }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => {
      return res.json()
    })

}

export const postQuestionToBucket = (questionText, id) => {       //put question text into bucket.  File is delivered but undefined
  return fetch(`http://localhost:3002/s3/textstorage`, {
    method: 'PUT',
    body: JSON.stringify({ questionText, id }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => {
      console.log(res)
      return res.json()
    })

}

export const fetchUsers = () => {
  return fetch('http://localhost:3002/rds/users')
    .then(buffer => buffer.json())
}