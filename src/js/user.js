export class User {
    static async create(user) {
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await fetch('https://travel-project-75e60-default-rtdb.europe-west1.firebasedatabase.app/users.json', options)
            const name = await res.json()
            return name
        } catch (e) {
            console.log('Failed to create user', e)
        }
    }
}