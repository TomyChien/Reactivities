export interface Duck {
    name: string;
    numLegs: number;
    makeSound: (sound:string) => void; //回傳類型void
}

const duck1: Duck = {
    name:'huey',
    numLegs:2,
    makeSound:(sound:string) => console.log(sound)
}

const duck2: Duck = {
    name:'dhuey',
    numLegs:2,
    makeSound:(sound:string) => console.log(sound)
}

duck1.makeSound('quack');

export const ducks = [duck1,duck2] //輸出內容