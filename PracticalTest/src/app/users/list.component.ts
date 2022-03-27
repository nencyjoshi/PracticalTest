import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users!: any[];
    roleList: any = [];
    allUsers: any = [];
    regionList: any = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users;
                this.allUsers = users;
            }
            );
        this.getRoles();
        this.getRegions();
    }

    private getRoles() {
        this.userService.getRoles()
            .pipe(first())
            .subscribe((res: any) => {
                this.roleList = res;
            })
    }

    private getRegions() {
        this.userService.getRegions()
            .pipe(first())
            .subscribe((res: any) => {
                this.regionList = res;
            })
    }

    onRoleChange(id: any) {
        this.users = this.allUsers.filter((x: { roleid: any; }) => x.roleid == id);
    }

    onRegionChange(id: any) {
        this.users = this.allUsers.filter((x: { regionid: any; }) => x.regionid == id);
    }
}