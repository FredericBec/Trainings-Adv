export class Training {
    id : number;
    name : string;
    description : string;
    duration : number
    price : number;
    quantity : number

    constructor(id : number, name : string, description : string, duration : number, price : number, quantity : number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.price = price;
        this.quantity = quantity;
    }
    
}
