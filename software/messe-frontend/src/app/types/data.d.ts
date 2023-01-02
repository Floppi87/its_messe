export interface PersonData {
    surname: string;
    firstname: string;
    email: string;
    phone: string;
    adress: PersonDataAdress;
    picture: string;
}

export interface PersonDataAdress {
    plz: number;
    city: string;
    street: string;
    houseNr: string;
    country: string;
}
