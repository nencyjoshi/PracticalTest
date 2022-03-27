import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

const baseUrl = `${environment.apiUrl}/users`;
const userListUrl = `http://localhost:1337/api/users`;
const roleUrl = `http://localhost:1337/api/getRoles`;
const regionUrl = `http://localhost:1337/api/getRegions`;
const insertUser = `http://localhost:1337/api/addUser`;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(userListUrl);
    }

    getRoles() {
        return this.http.get<any[]>(roleUrl);
    }

    getRegions() {
        return this.http.get<any[]>(regionUrl);
    }

    create(params: any) {
        return this.http.post(insertUser, params);
    }
}