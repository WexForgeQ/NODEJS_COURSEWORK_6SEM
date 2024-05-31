export const auth_input = {
    //placeholders
    placeholder_email: "Введите e-mail",
    placeholder_password: "Введите пароль",
    placeholder_login: "Введите логин",
    placeholder_secondpass: "Повторите пароль",
    placeholder_code: "Введите полученный код",
    //values
    text_email: "e-mail",
    text_password: "пароль",
    text_login: "логин",
    text_secondpass: "повторите пароль",
    text_code: "код",
    //types
    password_type: "password",
    text_type: "text",
    //patterns
    password_regex: "^(?=.*[a-z,A-Z])(?=.*[@$!%*?&]).{8,}$",
    login_regex: "^[A-Z].{5,}$",
    calc_regex: "/[^0-9]/",
    email_regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    text_pw_regex: "Должна быть хотя бы одна заглавная буква, один специальный символ и минимум 8 символов.",
    text_lg_regex: "Логин должен начинаться с буквы и иметь длинну не менее 6 символов",
    text_email_regex: "Неверный e-mail"
}

export const auth_buttons = {
    //values
    text_registration: "Зарегестрироваться",
    text_login: "Войти",
    text_google_login: "Войти с учетной записью Google",
    text_google_registration: "Создать учетную запись с Google"
}

export const home_inputs = {
    //values
    text_gallery_search: "Искать по ключевым словам..."
}