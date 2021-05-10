const galleryDOM = document.querySelector('.gallery')
const galleryInner = document.querySelector('.gallery__inner')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const activePage = document.querySelector('.active_page')
const lastPage = document.querySelector('.last_page')

let pressed = false
let startx
let x

function checkboundary() {
	let outer = galleryDOM.getBoundingClientRect()
	let inner = galleryInner.getBoundingClientRect()

	if (parseInt(galleryInner.style.left) > 0) {
			galleryInner.style.left =  '0px'
	} else if ((Math.abs(galleryInner.offsetLeft) + inner.width) > galleryInner.scrollWidth) {
			galleryInner.style.left = `-${(galleryInner.scrollWidth - inner.width) + 10}px`
		}
}

galleryDOM.addEventListener('touchstart', e => {
	pressed = true
	startx = e.changedTouches[0].clientX - galleryInner.offsetLeft
})

galleryDOM.addEventListener('touchmove', e => {
	if (!pressed) return
	e.preventDefault()

	x = e.changedTouches[0].clientX
	galleryInner.style.left =  `${x - startx}px`

	checkboundary()
})

window.addEventListener('touchend', () => {
	pressed = false
})

class Images {
	async getImages() {
		try {
			const res = await fetch('./data.json')
			const data = await res.json()
			const images = data.items.map(item => {
				const {id} = item.sys
				const path = item.image.fields.file.url
				const name = item.image.fields.file.name
				return {id, path, name}
			})
			return images
		} catch (e) {
			console.log(e)
		}
	}
}

class Gallery {
	selectedPage = 0
	imagesPerPage = 9
	pages = 0
	imagesPage = []
	images = []

	displayImages(images) {
		for (let i = 0; i < images.length; i++) {
			const div = document.createElement('div')
			div.classList.add('photo')
			const image = document.createElement('img')
			image.src = images[i].path
			image.alt = images[i].name
			image.style.animation = 'block_visibility .2s linear'
			div.appendChild(image)
			galleryInner.appendChild(div)
		}
	}

	setApp(items) {
		this.images = items
		this.imagesPage = this.images.slice(0, this.imagesPerPage)
		this.displayImages(this.imagesPage)
		activePage.innerHTML = `0${this.selectedPage + 1}`
		this.pages = Math.ceil(items.length / this.imagesPerPage)
		lastPage.innerHTML = `0${this.pages}`
	}

	computedPage() {
		const pageIndex = this.selectedPage * this.imagesPerPage
		this.imagesPage = this.images.slice(pageIndex, pageIndex + this.imagesPerPage)
		activePage.innerHTML = `0${this.selectedPage + 1}`
	}

	redraw() {
		galleryInner.innerHTML = ''
		this.displayImages(this.imagesPage)
	}

	prevPage() {
		if (this.selectedPage === 0) {
			this.selectedPage = this.pages - 1
			this.computedPage()
		} else {
			this.selectedPage--
			this.computedPage()
		}
		this.redraw()
	}

	nextPage() {
		if (this.selectedPage === this.pages - 1) {
			this.selectedPage = 0
			this.computedPage()
		} else {
			this.selectedPage++
			this.computedPage()
		}
		this.redraw()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const images = new Images()
	const gallery = new Gallery()

	images.getImages()
		.then(images => {
			gallery.setApp(images)
		})

	prev.addEventListener('click', () => {
        gallery.prevPage()
    })
    next.addEventListener('click', () => {
        gallery.nextPage()
    })
})