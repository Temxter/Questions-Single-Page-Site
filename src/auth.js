export function getAuthForm() {
    return `
        <form id="auth-form" class="mui-form modal-content">
            <div class="mui-textfield mui-textfield--float-label">
                <input id="email-input" type="email" required>
                <label for="email-input">Электронная почта</label>
            </div>    
            <div class="mui-textfield mui-textfield--float-label">
                <input id="password-input" type="password" required>
                <label for="password-input">Пароль</label>
            </div>
            <button id="question-submit-btn" type="submit" class="mui-btn mui-btn--primary">Войти</button>
        </form>
`
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDeChbtA42JbNekif9Z4-5TqqZ3cDlrQf4'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}