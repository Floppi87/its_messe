export interface PersonData {
    surname: string;
    firstname: string;
    email: string;
    phone: string;
    plz: number;
    city: string;
    street: string;
    houseNr: string;
    picture: string;
}
export interface PersonalFragment {
    surname: string;
    firstname: string;
    email: string;
    phone: string;
}
export interface AdressFragment {
    plz: number;
    city: string;
    street: string;
    houseNr: string;
    country: string;
}



export enum RegisterPhase {
    Personal,
    PersonalAdress,
    Webcam,
    Company,
    Interest,
    Finished
}

export enum ControlAction {
    Next,
    Back,
    Abort
}

export interface Product {
    id: number;
    name: string;
}