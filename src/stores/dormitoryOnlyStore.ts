import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import type { Dormitory } from "@/Types/dormitory"

class dormitoryOnlyStore {
    data: Dormitory = {} as Dormitory;
    open: boolean = false;
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

    setOpen(state: boolean) {
        this.open = state;
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
    
    async getUserLiveAt(id: number | null | undefined)  {
        try {
            const result = await axios.get(`http://localhost:3000/api/liveat/${id}`)
            return result.data
        } catch (error) {
            return false;
            console.log(error);
        }
    }

    async review(e: React.FormEvent<HTMLFormElement>, id: number | null | undefined) {
        e.preventDefault();
        try {
            if (id) {
                const getForm = new FormData(e.currentTarget);
                const formData = Object.fromEntries(getForm);
                formData.dmtId = this.data.id.toString();
                formData.userId = id.toString();
                if (formData.rating !== '') {
                    const result = await axios.post(`http://localhost:3000/api/dormitory/review`, formData);
                    runInAction(() => {
                        this.data.review.push(result.data.review);
                        this.data.reviewScore = result.data.totalScore;
                    });
                    this.setOpen(false);
                }

            }

        } catch (error) {
            console.log(error);
        }
    }
}

export default new dormitoryOnlyStore();