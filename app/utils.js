// Usage:
//   const getCSRFToken = () => getCookie("csrftoken")
//   console.log(getCSRFToken())
const getCookie = (name) => {
  let cookieValue = null
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";")
    cookies.forEach((cookie) => {
      cookie = cookie.trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        return cookieValue
      }
    })
  }
  return cookieValue
}


export {
  getCookie,
}
