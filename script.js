// https://github.com/ashthornton/asscroll
import ASScroll from 'https://cdn.skypack.dev/@ashthornton/asscroll'

const pageEl = document.querySelector('.page')

const asscroll = new ASScroll({
    // containerElement: '.my-container',
    scrollElements: pageEl,
    ease: 0.1,
    touchEase: 1,
    customScrollbar: true,
    scrollbarEl: '.my-scrollbar',
    scrollbarHandleEl: '.my-scrollbar-handle',
    scrollbarStyles: true,
    disableNativeScrollbar: true,
    touchScrollType: 'scrollTop',
    disableRaf: true,
    disableResize: true,
    limitLerpRate: true,
    blockScrollClass: '.asscroll-block'
})

window.addEventListener('load', () => {
    asscroll.enable()
    maxScrollEl.textContent = asscroll.maxScroll
})

function onRaf() {
    asscroll.update()
    requestAnimationFrame(onRaf)
}
requestAnimationFrame(onRaf)

window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    asscroll.resize({ width, height})
    maxScrollEl.textContent = asscroll.maxScroll
})

const targetPosEl = document.querySelector('[data-targetPos]')
const currentPosEl = document.querySelector('[data-currentPos]')
const maxScrollEl = document.querySelector('[data-maxScroll]')
const scrollEndEl = document.querySelector('[data-scrollEnd]')

asscroll.on('scroll', scrollPos => targetPosEl.textContent = scrollPos)
asscroll.on('scrollEnd', scrollPos => scrollEndEl.textContent = scrollPos)
asscroll.on('update', ({ currentPos }) => currentPosEl.textContent = currentPos)
