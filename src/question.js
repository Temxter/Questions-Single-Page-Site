export class Question {
    static create(question) {
        return fetch('https://questions-f01a0.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
            'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList(){
        const questions = getAllQuestionsFromLocalStorage()
        const contentHtml = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы пока не задавали вопросов</div>`
        const list = document.getElementById('questions-block')
        list.innerHTML = contentHtml
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve(`<p class="error">У вас нет токена. (Неправильно введены эл. почта или пароль).</p>`)
        }
        return fetch(`https://questions-f01a0.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">Ошибка при загрузке данных с сервера: ${response.error}</p>`
                }

                return response
                    ? Object.keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key}))
                    : []

            })
    }

    static listToHtml(questions){
        return questions.length > 0
            ? `<ol>${questions.map(question => {
                return `<li>${question.text}
                    [
                    ${new Date(question.date).toLocaleDateString()} 
                    ${new Date(question.date).toLocaleTimeString()}
                    ]</li>`
                    }).join('')}</ol>`
            : `<p>Вопросов пока нет</p>`
    }
}

function addToLocalStorage(question) {
    const allQuestions = getAllQuestionsFromLocalStorage()
    allQuestions.push(question)
    localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function toCard(question) {
    return `
      <div class="mui--text-black-54">
      ${new Date(question.date).toLocaleDateString()}
      ${new Date(question.date).toLocaleTimeString()}
      </div>
      <div>${question.text}</div>
      <br>
    `
}

function getAllQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}