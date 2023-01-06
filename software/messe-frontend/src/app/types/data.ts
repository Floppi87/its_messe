export interface PersonData {
    surname: string;
    firstname: string;
    email: string;
    phone: string;
    adress: AdressFragment;
    picture: string;
    company: CompanyFragment;
    interests: Product[];
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

export interface CompanyFragment {
    id: number;
    name: string;
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