import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class BlobService{
    constructor (private http:HttpClient){}
    getJsonData(blobUrl:string):Observable<any>{
        return this.http.get(blobUrl)
    }
}