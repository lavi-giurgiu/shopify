const navHeader = document.querySelector('.nav-header')
const padTopMain = document.querySelector('main')
const sec1 = document.querySelector('.sec1')

function setPaddingMain () {
  const navHeight = navHeader.clientHeight
  padTopMain.style.paddingTop = navHeight + 'px'
}
setPaddingMain()

window.addEventListener('resize', function() {
  setPaddingMain()
})

let hHeaderSec1 = sec1.clientHeight

document.addEventListener('scroll', function(event) {
  // CHANGE HEADER STYLE
  const el = event.target.documentElement
  hHeaderSec1 = sec1.clientHeight

  if (el.scrollTop > hHeaderSec1) {
    navHeader.style.backgroundColor = 'white'
    navHeader.style.boxShadow = '0 10px 10px -10px rgb(33, 35, 38, 10%)'
  } else {
    navHeader.style.backgroundColor = '#FBF7ED'
    navHeader.style.boxShadow = 'none'
  }


  // LAZY-LOAD IMG
  document.querySelectorAll('img:not(.sec1 img)').forEach((imgPcs)=> {
    if(imgPcs.getBoundingClientRect().top <= window.innerHeight/6*5) {
      imgPcs.classList.add('open-image') 
    }
  })
})


// MENU DISPLAY
const itemsMenu = document.querySelectorAll('.btn-parent')
const boxSecMenu = document.querySelectorAll('.boxes')
const btnItemsMenu = document.querySelectorAll('.special-btn')
const secMenuBtns = document.querySelectorAll('.boxes li>button')
const forWidthDiv = document.querySelectorAll('.boxes>div')
const forWidthUl = document.querySelectorAll('.boxes>div>ul')
const popBox = document.querySelectorAll('.pop-btns-box')


window.addEventListener('click', (ev)=> {
  closeBoxWindow(ev, boxSecMenu, itemsMenu)
})

function closeBoxWindow (ev, box, buttons) {
  let isBox = false
  
  if (box[1] === undefined) {
    if (box.contains(ev.target)) {
      isBox = true
    }
  } else {
    box.forEach((it)=>{
      if (it.contains(ev.target)) {
        isBox = true
      }
    })
  }
  
  if (buttons[1] === undefined) {
    return
  } else {
    buttons.forEach((it)=>{
      if (it.contains(ev.target)) {
        isBox = true
      }
    })
  }

  if (!isBox ) {
    if (box[1] === undefined) {
      if (box.parentElement.classList.contains('active')) {
        box.parentElement.classList.remove('active')
      }
    } else {
      box.forEach((item)=> { 
        if (item.parentElement.classList.contains('active')) {
          item.parentElement.classList.remove('active')
          setBoxWidth()
        }
      })
    }
  } 
}

// first btns menu
btnItemsMenu.forEach((button)=>{
  button.addEventListener('click', ()=> {
    
    if (!button.parentElement.classList.contains('active')) {
      document.querySelectorAll('.boxes').forEach((item)=> {
        item.parentElement.classList.remove('active')
      })
      setBoxWidth()
      hideBox()
      button.parentElement.classList.add('active')
    } else {
      button.parentElement.classList.remove('active')
      hideBox()
      setBoxWidth()
    }
  }) 
}) 



//inner boxes
secMenuBtns.forEach((btns) => {
  btns.addEventListener('click', function() {
    if (this.parentElement.parentElement.parentElement.style.width === '200%' && this.nextElementSibling.classList.contains('display-block')) {
      hideBox()
      setBoxWidth()
    } else {
      this.parentElement.parentElement.parentElement.style.width = '200%'
      hideBox()
      forWidthUl.forEach(function (ul) {
        ul.style.borderRightColor = '#d2d5d9'
      })  
      this.nextElementSibling.classList.add('display-block')
    }  
  })
})

function hideBox () {
  popBox.forEach((box) => {
    box.classList.remove('display-block')
  })

  forWidthUl.forEach(function (ul) {
    ul.style.borderRightColor = 'transparent'
  })
}

function setBoxWidth () {
  forWidthDiv.forEach( function(elem) {
    elem.style.width = '100%'
  })
}



// MODAL
const modalPage = document.querySelector('.modal')
const startTrialBtn = document.querySelectorAll('.start-trial')
const playVideo = document.querySelectorAll('.play-video')
const formModal = `
  <div class="div1">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <h2>Start your free 14-day trial of Shopify</h2>
    <form>
      <label>
        <span>Email address</span>
        <input
          type="email"
          id="email-modal"
          class="input-style" 
          placeholder="Email address" 
          required
          validate
        >
      </label>
      <label>
        <span>Password</span>
        <input
          type="password" 
          id="password-modal" 
          class="input-style" 
          placeholder="Password"
          required
          validate
        >
      </label>
      <label>
        <span>Your store name</span>
        <input 
          type="text" 
          id="store-modal" 
          class="input-style" 
          placeholder="Your store name"
          required
          validate
        >
      </label>
      <button type="submit" class="submit-modal start-trial">
        Create your store
      </button>
    </form>
  </div>
`

startTrialBtn.forEach((stBtn)=> {
  stBtn.addEventListener('click', ()=> {
    modalPage.classList.add('display-block')
    modalPage.innerHTML = formModal

    modalPage.querySelector('.div1').classList.add('active')
    
    evInput()
    closeModal()

    const emailInput = modalPage.querySelector('#email-modal')
    const passwordInput = modalPage.querySelector('#password-modal')
    const storeInput = modalPage.querySelector('#store-modal')
    bodySelect.style.overflow = 'hidden'

    validOnChangeInp(emailInput, passwordInput)
    validStoreOnInp(storeInput)
    submitTrialModal(emailInput, passwordInput, storeInput)
    

    emailInput.value = document.querySelector('.form1 input').value
    if (emailInput.value !== '') {
      emailInput.style.cssText = 'padding-top: 24px; padding-bottom: 8px;'
      emailInput.previousElementSibling.classList.add('active-span')

      if (!(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(emailInput.value))) {
        appendErrorMessage(emailInput, 'Please enter a valid email address')
      }
    }   
    emailInput.focus()
  })
})

function appendErrorMessage (el, message) {
  const span = createErrorSpan(message)
  setTimeout(() => {
    if (el.nextElementSibling !== null) {
      el.nextSibling.remove()
    }

    el.after(span)
    el.classList.add('error-ms') 
  }, 150);
  
}
function createErrorSpan (message) {
  const span = document.createElement('span')
  span.innerText = message
  span.className = 'text-error'

  return span
}

function evInput () {
  modalPage.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', changeInpTextFormat)
  })
}

function changeInpTextFormat () {
  const descript = this.previousElementSibling
  const checkText = this.value
  
  if (checkText === '') {
    this.style.cssText = 'padding-top: 16px; padding-bottom: 16px;'
    descript.classList.remove('active-span')
  } else {
    this.style.cssText = 'padding-top: 24px; padding-bottom: 8px;'
    descript.classList.add('active-span')
  }
}

document.querySelector('#enter-email').addEventListener('input', changeInpTextFormat)

function submitTrialModal (emailInput, passwordInput, storeInput) {
  modalPage.querySelector('.submit-modal').addEventListener('click', ev => {
    ev.preventDefault()

    modalPage.querySelectorAll('.text-error')
      .forEach(el => el.remove()
    )
    modalPage.querySelectorAll('input')
      .forEach(inp => inp.classList.remove('error-ms')
    )

    // Email
    if (emailInput.value === '') {
      appendErrorMessage(emailInput, 'Please enter an email address')
      
    } else if (!(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(emailInput.value))) {
      appendErrorMessage(emailInput, 'Please enter a valid email address')
    }

    // Password
    if (passwordInput.value === '') {
      appendErrorMessage(passwordInput, 'Please enter a password')
      
    } else if (passwordInput.value[0] === ' ' || passwordInput.value[passwordInput.value.length - 1] === ' ') {
      appendErrorMessage(passwordInput, 'Password cannot start or end with a space')
    } else if (passwordInput.value.length < 5) {
      appendErrorMessage(passwordInput, 'You need to use at least 5 characters')
    }

    // Store
    if (storeInput.value === '') {
      appendErrorMessage(storeInput, 'Please enter a store name')
      
    } else if (storeInput.value.length < 4) {
      appendErrorMessage(storeInput, 'Your store name must be at least 4 characters')
    }

    setTimeout(()=> {
      if (emailInput.nextElementSibling !== null ) {
        emailInput.focus()
      } else if (passwordInput.nextElementSibling !== null) {
        passwordInput.focus()
      } else if (storeInput.nextElementSibling !== null) {
        storeInput.focus() 
      }
    }, 150)
    
  })
}

function validOnChangeInp (emailInput, passwordInput) {
  modalPage.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', function() {

      modalPage.querySelectorAll('.text-error')
        .forEach(el => el.remove()
      )
      modalPage.querySelectorAll('input')
        .forEach(inp => inp.classList.remove('error-ms')
      )      

      if (emailInput.value !== ''  && !(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(emailInput.value))) {
        appendErrorMessage(emailInput, 'Please enter a valid email address')
      }

      if (passwordInput.value !== '' && passwordInput.value[0] === ' ' || passwordInput.value[passwordInput.value.length - 1] === ' ') {
        appendErrorMessage(passwordInput, 'Password cannot start or end with a space')
      } else if (passwordInput.value.length < 5 && passwordInput.value !== '') {
        appendErrorMessage(passwordInput, 'You need to use at least 5 characters')
      }
    })
  })
}

function validStoreOnInp (storeInput) {
  storeInput.addEventListener('input', () => {
    modalPage.querySelectorAll('.text-error')
      .forEach(el => el.remove()
    )
    modalPage.querySelectorAll('input')
      .forEach(inp => inp.classList.remove('error-ms')
    )

    const storeInput = modalPage.querySelector('#store-modal')
    if (storeInput.value.length < 4 && storeInput.value !== '') {
      appendErrorMessage(storeInput, 'Your store name must be at least 4 characters')
    }
  })
}


const video1 = `
  <div class="div2">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <video src="videos/e1b161bf1d32cb9ab4be2cada28179a7b37be3ed.mp4" autoplay controls>
  </div>
`
const video2 = `
  <div class="div2">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <video src="videos/ceeceecloset.mp4" autoplay controls>
  </div>
`

playVideo.forEach(btn => { 
  btn.addEventListener('click', () => {
    bodySelect.style.overflow = 'hidden'
    if (btn.classList.contains('btn-play')) {
      displayModalVideo(video1)
      return
    }
    displayModalVideo(video2) 
  })
})

function closeModal() {
  modalPage.querySelector('.close-modal').addEventListener('click', function() {  
    closeModalAct()
  })
}

function closeModalAct () {
  if (modalPage.classList.contains('display-video')) {
    modalPage.querySelector('video').pause()
    modalPage.querySelector('.div2').classList.remove('active')
    modalPage.classList.remove('display-video')
  }

  if (modalPage.querySelector('.div1') !== null) {
    modalPage.querySelector('.div1').classList.remove('active')
  }

  if (modalPage.querySelector('.div3') !== null) {
    modalPage.querySelector('.div3').classList.remove('active-div')
  }
  
  modalPage.classList.remove('display-block')
  bodySelect.style.overflowY = 'scroll'
}

function displayModalVideo (videoSrc) {
  modalPage.innerHTML = videoSrc

  if (modalPage.querySelector('.div2') !== null) {
    modalPage.classList.add('display-video')
    modalPage.querySelector('.div2').classList.add('active')
  } else {
    modalPage.classList.add('display-block')
  }

  modalPage.querySelector('.div2>.modal-header, .div3>.modal-header').style.paddingBottom = '10px'
  closeModal()
}


//pause btn
let isPause = false
const smallVideo = document.querySelector('.sec3 .sell video')
const svgPause = `
  <svg id="modules-pause">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5.5 19a1 1 0 01-1-1V2a1 1 0 012 0v16a1 1 0 01-1 1zm9.01 0a1 1 0 01-1-1V2a1 1 0 012 0v16a1 1 0 01-1 1z">
      </path>
    </svg>
  </svg>
`
const svgPlay = `
  <svg id="modules-play">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5 3.51L15.82 10 5 16.49v-13M4.33 1A1.33 1.33 0 003 2.33v15.34A1.33 1.33 0 004.33 19a1.3 1.3 0 00.67-.19l12.8-7.67a1.33 1.33 0 000-2.28L5 1.19A1.3 1.3 0 004.33 1z">
      </path>
    </svg>
  </svg>
`

document.querySelector('#pause-video-btn').addEventListener('click', function() {
  if (isPause) {
    isPause = false
    smallVideo.play()
    this.innerHTML = svgPause
  } else {
    isPause = true
    smallVideo.pause()
    this.innerHTML = svgPlay
  }
})

isStoped = false
document.querySelector('.canvas-map button').addEventListener('click', function() {
  if (isStoped) {
    isStoped = false
    this.innerHTML = svgPause
  } else {
    isStoped = true
    this.innerHTML = svgPlay
  }
})

// bars btn mobile
const displayOnMobile = document.querySelector('.display-on-mobile>button')
const logoSite = document.querySelector('.logo')
const listsNav1 = document.querySelector('.list1')
const listsNav2 = document.querySelector('.list2')
const listNavFooter = document.querySelector('.nav-footer')
const headerVar = document.querySelector('header')
const bodySelect = document.querySelector('body')


displayOnMobile.addEventListener('click', () => {

  if (!displayOnMobile.parentElement.classList.contains('active')) {
    displayOnMobile.parentElement.classList.add('active')
  }

  let menuMobile = `
    <header>
      ${headerVar.innerHTML}
    </header>
    <div class="div3">
      <div class="modal-header">
        <div class="logo">
          ${logoSite.innerHTML}
        </div>
        <button class="close-modal">&times;</button>
      </div>
      <ul class="list-nav list1">
        ${listsNav1.innerHTML}
      </ul>
      <ul class="list-nav list2">
        ${listsNav2.innerHTML}
      </ul>
      <div class="list-nav">
        ${listNavFooter.innerHTML}
      </div>
    </div>
  `
  displayModalVideo(menuMobile)

  const headModal = modalPage.querySelector('header')
  const div3Modal = modalPage.querySelector('.div3')
  const trialModalBtn = modalPage.querySelector('.div3 form button')
  div3Modal.classList.add('active-div')

  modalPage.addEventListener('click', function (ev) {
    if (div3Modal.classList.contains('active-div')) {
      closeModalInModal(ev, div3Modal, headModal)
    }
  })
  
  setMobNavStyle(headModal, trialModalBtn)

  modalPage.querySelectorAll('.div3 li>button').forEach(button => {
    button.parentElement.classList.remove('active')

    button.addEventListener('click', function() {
      if (!button.parentElement.classList.contains('active')) {
        button.parentElement.classList.add('active')
        this.nextElementSibling.style.cssText = `
          position: static; 
          margin-bottom: 16px;
        `      
      } else {
        button.parentElement.classList.remove('active')
      }
    })
  })

  modalPage.querySelectorAll('.modal .div3 .boxes li>*:first-child')
    .forEach(secondBtn => secondBtn.addEventListener('click', showPopBtnModal)
  )
})


function showPopBtnModal () {
  if (this.nextElementSibling.style.display === 'block') {
    this.nextElementSibling.style.display = 'none'
    this.querySelector('svg').style.transform = 'none'
    this.querySelector('svg>path').style.fill = 'rgb(130, 138, 145)'
  } else {
    this.nextElementSibling.style.display = 'block'
    this.querySelector('svg').style.transform = 'rotate(180deg)'
    this.querySelector('svg>path').style.fill = '#212326'
  }
}

function displayFormFromModal() {
  modalPage.querySelector('.div3').classList.remove('active-div')
  modalPage.style.cssText = `
    background-color: #212326; 
    overflow: hidden;
  `
  modalPage.innerHTML = formModal
  modalPage.querySelector('.div1').classList.add('active')

  evInput()
  closeModal()

  const emailInput = modalPage.querySelector('#email-modal')
  submitTrialModal(emailInput)
  emailInput.focus()
}

function closeModalInModal (ev, div, head) {   
  if (!(div.contains(ev.target) || head.contains(ev.target))) {

    closeModalAct()

    modalPage.style.cssText = `
      background-color: #212326; 
      overflow: hidden;
    ` 
  } else {

    return
  }
}

function setMobNavStyle (headModal, trialModalBtn) {
  modalPage.style.cssText = `
    background-color: rgba(0, 0, 0, 0.6); 
    overflow-y: scroll; 
    overflow-x: hidden; 
    transition: all .5s
  `
  bodySelect.style.overflow = 'hidden'

  headModal.style.cssText = `
    position: sticky; 
    top: 0;
  `

  modalPage.querySelector('button.close-modal')
    .addEventListener('click', () => {
      modalPage.style.cssText = `
        background-color: #212326; 
        overflow: hidden;
      `
  })

  modalPage.querySelectorAll('.div3 .list-nav, .div3 .list1>*, .div3 .list2>*')
    .forEach(list => list.style.cssText = `
      display: block; 
      margin: 0;
    `
  )
  modalPage.querySelector('.modal-header').style.cssText = `
    display: flex; 
    justify-content: 
    space-between; 
    height: 60px; 
    padding: 16px 0;
  `
  modalPage.querySelector('.close-modal').style.cssText = `
    color: #212326; 
    font-size: 50px; 
    line-height: .5;
  `
  modalPage.querySelector('.div3 .logo').style.cssText = `
    display: inline-block; 
    height: 32px;
  `
  modalPage.querySelectorAll('.div3 li>*:first-child')
    .forEach(item => item.style.cssText = `
      display: flex; 
      justify-content: space-between; 
      width: 100%; 
      padding: 16px 0; 
      line-height: 1; 
      color: #212b36;
    `
  )
  modalPage.querySelectorAll('.div3 .list2 li>*, .div3 .list-nav:last-child li>*')
    .forEach(item => item.style.padding = '11.43px 0'
  )
  modalPage.querySelectorAll('.div3 .list-nav')
    .forEach(list => list.style.cssText = `
      display: block; 
      border-top: 1px solid #d2d5d9; 
      padding: 16px 0;
    `
  )
  modalPage.querySelector('.div3 li>form')
    .style.padding = '20px 0 4px'
  modalPage.querySelector('header>nav .list1')
    .style.display = 'none !important'
  modalPage.querySelector('.div3 .display-on-mobile')
    .style.display = 'none'
  modalPage.querySelectorAll('.div3 .list-nav li button>svg')
    .forEach(arrow => arrow.style.marginTop = '6px !important'
  ) 

  trialModalBtn.style.width = '100%'
  trialModalBtn.addEventListener('click', displayFormFromModal)

  // boxes
  modalPage.querySelectorAll('.div3 .boxes>div')
    .forEach(div => div.style.width = '100%'
  )
  modalPage.querySelectorAll('.modal .div3 .pop-btns-box')
    .forEach(popBox => popBox.style.display = 'none'
  )
}