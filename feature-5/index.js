const sendPersonDataToServer = (event) => {
    event.preventDefault()

    const first_name = event.target.first_name.value;
    const surname = event.target.surname.value;
    const submitter = event.target.submitter.value;
    const questioner = event.target.questioner.value;
    const region = event.target.region.value;
    const email = event.target.email.value;
    const user_password = event.target.user_password.value;
    const gender = event.target.gender.value;
    const dob = event.target.dob.value;
    const occupation = event.target.occupation.value;

    // const { first_name, surname, submitter, questioner, region, email, user_password, gender, dob, occupation } = event.target;
    // console.log(event.target)
    return fetch('http://localhost:3000/RDS/upload', {
        method: 'PUT',
        body: JSON.stringify({ first_name, surname, submitter, questioner, region, email, user_password, gender, dob, occupation }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(buffer => buffer.json())
        .catch(err => {
            console.log(err)
        })
}

document.getElementById('addPerson').addEventListener('submit', sendPersonDataToServer)