import { makeAutoObservable } from "mobx";
import axios from "axios";
import type { Dormitory } from "@/Types/dormitory"

class dormitoryOnlyStore {
    data: Dormitory = {} as Dormitory;

    targetOverview: React.RefObject<HTMLElement> | undefined;
    targetState: React.RefObject<HTMLElement> | undefined;
    targetRoom: React.RefObject<HTMLElement> | undefined;
    targetReview: React.RefObject<HTMLElement> | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setData(data: Dormitory) {
        this.data = data;
    }

    scrollToOverview() {
        if (this.targetOverview) {
            const element = this.targetOverview.current;
            const offset = 150;
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth',
                });
            }
        }
    }

    scrollToState() {
        if (this.targetState) {
            const element = this.targetState.current;
            const offset = 150;
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth',
                });
            }
        }
    }

    scrollToRoom() {
        if (this.targetRoom) {
            const element = this.targetRoom.current;
            const offset = 150;
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth',
                });
            }
        }
    }

    scrollToReview() {
        if (this.targetReview) {
            const element = this.targetReview.current;
            const offset = 150;
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth',
                });
            }
        }
    }

    async review(e: React.FormEvent<HTMLFormElement>, id: number | null | undefined) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        try {
            if (id) {
                const liveAt = await axios.get(`http://localhost:3000/api/liveAt/${id}`)
                console.log(liveAt.data.data);
                if (liveAt.data.data.length > 0) {
                    console.log('test');
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export default new dormitoryOnlyStore();