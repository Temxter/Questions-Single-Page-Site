import './styles/style.css'
import {isValid} from "./untils";
import {Question} from "./question";

const form = document.getElementById('question-form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#question-submit-btn')
submitBtn.disabled = true

window.addEventListener('load', () => Question.renderList())

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

