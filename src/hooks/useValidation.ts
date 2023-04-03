export const useValidation = () => {
  const validateEmail = (email: string) => {
    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([-_.]?[0-9a-zA-Z])/i
    if (email.length >= 1 && !emailRegEx.test(email)) {
      return false
    }
    return true
  }

  const validatePassword = (password: string) => {
    if (password.length >= 1 && password.length < 8) {
      return false
    }
    return true
  }

  return {
    validateEmail,
    validatePassword,
  }
}