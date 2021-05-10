const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
	anchor.addEventListener('click', e => {
		e.preventDefault()
		const blockId = e.target.getAttribute('href')
		document.querySelector(`${blockId}`).scrollIntoView({
			behavior: 'smooth',
            block: 'start'
		})
	})
}