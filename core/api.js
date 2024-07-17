import { BACKEND, BACKEND2 } from "./var"

// export const fetchApiCall=async (apiEndpoint, method = 'GET', dataToSent) => {
//     const response = await fetch(BACKEND + apiEndpoint, {
//         // const response = await fetch(BACKEND2 + 'auth/sign/', {
//         method: method,
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(dataToSent)
//     })
//     const data = await response.json()

//     if (response.ok) {
//         return data
//     }else {
//         throw new Error('Error in fetchApiCall : '+JSON.stringify(data))
//     }
// }
export const fetchApiCall=async (apiEndpoint, options) => {
    const {headers, ...otherOptions} = options
    const response = await fetch(BACKEND + apiEndpoint, {
        // const response = await fetch(BACKEND2 + 'auth/sign/', {
        method: "GET",
        headers: {'Content-Type': 'application/json',...headers },
        ...otherOptions,
    })
    const data = await response.json()

    if (response.ok) {
        return data
    }else {
        throw new Error('Error in fetchApiCall : '+JSON.stringify(data))
    }
}