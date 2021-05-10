import {User} from './user'
import {isValidName, isValidEmail} from './utils'

const form = document.getElementById('form')
const input = document.querySelectorAll('input')
const inputName = form.querySelector('#name')
const inputEmail = form.querySelector('#email')
const submitBtn = form.querySelector('#submit')

function submitHandler(e) {
	e.preventDefault()

	if (isValidName(inputName.value) && isValidEmail(inputEmail.value)) {
		const user = {
			name: inputName.value,
			email: inputEmail.value,
			id: Date.now()
		}
		
		submitBtn.disabled = true

		User.create(user).then((name) => {
			inputName.value = ''
			inputEmail.value = ''
			submitBtn.disabled = false
			console.log(name)
		})
	}
}

input.forEach((item, i) => {
	item.addEventListener('focus', () => {
		const placeholder = form.querySelectorAll('.placeholder')[i]
		if (!placeholder.classList.contains('hidden')) {
			placeholder.classList.add('hidden')
		}
	})

	item.addEventListener('blur', e => {
		if (e.target.value === '') {
			form.querySelectorAll('.placeholder')[i].classList.remove('hidden')
		}
	})

	item.addEventListener('input', e => {
		if (e.target.value === '') {
			form.querySelectorAll('.placeholder')[i].classList.remove('hidden')
		}
	})
})

form.addEventListener('submit', submitHandler)

inputName.addEventListener('input', () => {
	submitBtn.disabled = !isValidName(inputName.value)
})

inputEmail.addEventListener('input', () => {
	submitBtn.disabled = !isValidEmail(inputEmail.value)
})
