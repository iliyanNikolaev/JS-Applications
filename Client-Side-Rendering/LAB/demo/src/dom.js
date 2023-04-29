export function dom(tagName, atributes = {}, ...content) {

    const element = document.createElement(tagName);

    for (const propName in atributes) {
        if (propName == 'dataset') {
            for (const dataItem in atributes.dataset) {
                element.dataset[dataItem] = atributes.dataset[dataItem];
            }
        } else if (propName == 'style') {
            for (const dataItem in atributes.style) {
                element.style[dataItem] = atributes.style[dataItem];
            }
        } else if(propName.slice(0, 2) == 'on'){
            const eventType = propName.slice(2).toLowerCase();
            element.addEventListener(eventType, atributes[propName]);
        } else {
            element[propName] = atributes[propName];
        }
    }

    for (const item of content) {
        element.append(item);
    }

    return element;
}