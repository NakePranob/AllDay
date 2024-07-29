import { makeAutoObservable } from "mobx";
import type { Dormitory } from "@/Types/dormitory"

class dormitory {
    data: Dormitory = {} as Dormitory;
    constructor() {
        makeAutoObservable(this);
    }

    setData(data: Dormitory) {
        this.data = data;
    }
}

export default new dormitory();