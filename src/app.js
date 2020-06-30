import './styles/style.css'
import {createModal, isValid} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const form = document.getElementById('question-form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#question-submit-btn')
const authBtn = document.getElementById('auth-btn')
submitBtn.disabled = true

window.addEventListener('load', () => Question.renderList())
authBtn.addEventListener('click', openModal)
form.addEventListener('submit', submitFromHandler)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFromHandler(event){
    event.preventDefault()

    const question = {
        text: input.value.trim(),
        date: new Date().toJSON()
    }
    submitBtn.disabled = true

    Question.create(question)
        .then(response => {
            input.value = ""
            input.className = ""
        })
}

function openModal(event) {
    createModal('Вход', getAuthForm())
    const modalForm = document.getElementById('auth-form')
    const modalSubmitBtn = modalForm.querySelector('#question-submit-btn')
    // const loginField = modalForm.querySelector('#email-input')
    // const passwordField = modalForm.querySelector('#password-input')

    modalForm.addEventListener('submit', authFormHandler, {once: true})
    function authFormHandler(event) {
        event.preventDefault()
        const email = event.target.querySelector('#email-input').value //loginField.value
        const password = event.target.querySelector('#password-input').value //passwordField.value
        submitBtn.disabled = true
        authWithEmailAndPassword(email, password)
            .then(Question.fetch)
            .then(renderModalAfterAuth)
            .then(() => submitBtn.disabled = false)

    }
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Ошибка', content)
    }
    else {
        createModal('Список вопросов', Question.listToHtml(content))
    }
}
