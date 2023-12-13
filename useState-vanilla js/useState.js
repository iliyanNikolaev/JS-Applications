export function useState(initValue) {
    let state = initValue;
    const subscribers = [];

    function getState() {
        return state;
    }

    function setState(newState) {
        state = newState;
        subscribers.forEach(subscriber => subscriber());
    }

    function subscribe(callback) {
        subscribers.push(callback);
        return function unsubscribe() {
            subscribers.filter(s => s != callback);
        }
    }

    return [ getState, setState, subscribe ]
}