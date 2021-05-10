const animateItems = document.querySelectorAll('._animate-items')

function offset(el) {
    const rect = el.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}

function animateOnScroll() {
    for (let item of animateItems) {
        const animateItem = item
        const animateItemHeight = animateItem.offsetHeight
        const animateItemOffset = offset(animateItem).top
        const animateStart = 4

        let animateItemPoint = window.innerHeight - animateItemHeight / animateStart
        if (animateItemHeight > window.innerHeight) {
            animateItemPoint = window.innerHeight - window.innerHeight / animateStart
        }

        if ((pageYOffset > animateItemOffset - animateItemPoint) && (pageYOffset < animateItemOffset + animateItemHeight)) {
            animateItem.classList.add('_active')
        } else {
            if (!animateItem.classList.contains('_animate-no-hide')) {
                animateItem.classList.remove('_active')
            }
        }
    }
}

if (animateItems.length > 0) {
    window.addEventListener('scroll', animateOnScroll)

    setTimeout(() => {
        animateOnScroll()
    }, 300)
}