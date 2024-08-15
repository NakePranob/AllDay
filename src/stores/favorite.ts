import { makeAutoObservable } from "mobx";
import axios from "axios";
import { AlertType } from "@/Types/alert";

type DormitoryImage = {
    url: string;
};

type Dormitory = {
    id: number;
    name: string;
    engname: string;
    price: number;
    reviewScore: number;
    dormitory_img: DormitoryImage[];
};

type Favorites = {
    id: number;
    dormitory: Dormitory;
};

class favorite {
    data: Favorites[] = [];
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

    async getData(id:string | null) {
        const result = await axios.get(`http://localhost:3000/api/favorite/${id}`);
        this.setData(result.data);
    }

    setData(data: Favorites[]) {
        this.data = data;
    }

    async delete(id: number) {
        try {
            await axios.delete(`http://localhost:3000/api/favorite/${id}`);
            this.data = this.data.filter(favorite => favorite.id !== id);
            this.setAlert({
                open: true,
                state: 'success',
                text: 'ลบข้อมูลสำเร็จ',
                link: null
            });
        } catch (error) {
            this.setAlert({
                open: true,
                state: 'error',
                text: 'มีบางอย่างผิดพลาด',
                link: null
            });
            console.log(error);
        }
    }
}

export default new favorite();
