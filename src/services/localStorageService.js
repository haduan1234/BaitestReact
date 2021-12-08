
const USER_KEY = "itemsArray"
export const setTaskLc = (items) => {
    let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    oldItems.push(items);
    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
}

export const getTaskLc = () => {
    let task = localStorage.getItem(USER_KEY)
    if (!!task) {
        return JSON.parse(task)
    }
    return null
}

export const clearTaskLc = () => {
    localStorage.removeItem(USER_KEY)
}