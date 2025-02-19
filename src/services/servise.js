const KEY = "776ae476076fdb0fef1772c2718d54ed"

const URL = (name) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${KEY}&units=metric`
}


export {URL}