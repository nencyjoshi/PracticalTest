import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    roleList: any = [];
    regionList: any = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        const formOptions: AbstractControlOptions = {};
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            region: ['', Validators.required],
        }, formOptions);

        this.getRoles();
        this.getRegions();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.createUser();
    }


    private getRoles() {
        this.userService.getRoles()
            .pipe(first())
            .subscribe((res: any) => {
                this.roleList = res;
            })
            .add(() => this.loading = false);
    }

    private getRegions() {
        this.userService.getRegions()
            .pipe(first())
            .subscribe((res: any) => {
                this.regionList = res;
            })
            .add(() => this.loading = false);
    }


    private createUser() {
        this.userService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('User added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
}