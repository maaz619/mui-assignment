export const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res
}