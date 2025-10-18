const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


interface ApiResponse<T = any>{
    success:boolean;
    message:string;
    data:T;
    meta?:any
}


