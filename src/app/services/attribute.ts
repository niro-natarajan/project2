export interface loginAttribute {
    username: string;
    password: string;
}

export interface signUpAttribute {
    fullname: string,
    emailid: string,
    phonenumber: string,
    password: string,
}

export interface products {
    title: string,
    description: string,
    price: string,
    imageUrl: string,
    id: number,
    type: string,
    quantity: number,
    cost?: number;
}


export interface buynow {
    title: string;
    price: number;
    total: number;
    imageUrl: string;
}

export interface Order {
    id: number;
    items: products[];
    total: number;
    price: number;
    shippingAddress: string; 
    // paymentMethod: string;
}

