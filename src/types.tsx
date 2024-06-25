export default interface WeatherData {
    name : string;
    main : {
        temp : number;
        humidity : number;
        temp_max : number;
        temp_min : number;
    };
    weather : {
        main : string;
        description : string;

    }[];
    wind : {
        speed : number;
    };
    sys : {
        sunrise : number;
        sunset: number;
        country : string;
    };

}