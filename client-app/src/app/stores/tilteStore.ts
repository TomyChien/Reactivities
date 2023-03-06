import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export default class TitleStore {
    title='Hello from Mobx!';
    name='測試React網站';

    constructor() {
        //自動觀察物件
        makeAutoObservable(this)

        //手動設定觀察物件或變數
        // makeObservable(this, {
        //     title: observable, //可觀察
        //     name: observable,
        //     setTitle: action
        // })
    }

    setTitle = () => {
        this.title = this.title + '!';
    }
}