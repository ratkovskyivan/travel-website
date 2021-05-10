export function isValidName(name) {
    return name.length >= 3
}

export function isValidEmail(email) {
    return email.includes('@')
}