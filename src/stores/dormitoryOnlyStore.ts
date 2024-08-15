import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import type { Dormitory } from "@/Types/dormitory"
import { AlertType } from "@/Types/alert";

class dormitoryOnlyStore {
    data: Dormitory = {} as Dormitory;
    open: boolean = false;
    targetOverview: React.RefObject<HTMLElement> | undefined;
    targetState: React.RefObject<HTMLElement> | undefined;
    targetRoom: React.RefObject<HTMLElement> | undefined;
    targetReview: React.RefObject<HTMLElement> | undefined;
    alert: AlertType = {
        open: false,
        state: '',
        text: '',
        link: null
    };

    constructor() {
        makeAutoObservable(this);
    }

    resetAlert() {
        this.alert.open = false;
        this.alert.state = '';
        this.alert.text = '';
        this.alert.link = null;
    }

    setAlert(alert: AlertType) {
        this.alert = alert;
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

    async addFavorite(dmtId: number | null | undefined, userId: number | null | undefined) {
        try {
            const formData = {
                dmtId,
                userId,
            }
            if (dmtId && userId) {
                await axios.post(`http://localhost:3000/api/favorite`, formData);
                this.setAlert({
                    open: true,
                    state: 'success',
                    text: 'ทำการเพิ่มรายการโปรด',
                    link: null
                })
            } else {
                this.setAlert({
                    open: true,
                    state: 'warning',
                    text: 'กรุณาเข้าสู่ระบบ',
                    link: '/login'
                })
            }
        } catch (error) {
            this.setAlert({
                open: true,
                state: 'error',
                text: 'มีบางอย่างผิดพลาด',
                link: null
            })
            console.log(error);
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
                    this.setAlert({
                        open: true,
                        state: 'success',
                        text: 'รีวิวสำเร็จ',
                        link: null
                    });
                } else {
                    this.setAlert({
                        open: true,
                        state: 'warning',
                        text: 'กรุณากำหนดคะแนน',
                        link: null
                    })
                }
            }

        } catch (error) {
            console.log(error);
            this.setAlert({
                open: true,
                state: 'error',
                text: 'มีบางอย่างผิดพลาด',
                link: null
            });
        }
    }
}

export default new dormitoryOnlyStore();