import {Component, Output, Inject} from '@angular/core';
import {User} from '../models/user';
import {Group} from '../models/group';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {UUID} from 'angular2-uuid';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {MarketplaceService} from '../services/marketplace.service';

@Component({
    selector: 'groups',
    templateUrl: '../views/groups.pug'
})
export class GroupsComponent {

    // The current selection, if any.
    group: Group;
    groups: Array<Group>;

    constructor(private marketplaceService: MarketplaceService,
        private groupService: GroupService,
        private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        this.groups = new Array<Group>();
        this.groupService.index().subscribe(d => {
            this.groups = d['results'];
        });
    }

    select(group: Group) {
        this.group = group;
    }

    create() {
        let group = new Group();
        group.name = "New Group " + UUID.UUID();
        this.groupService.create(group).subscribe(d => {
            this.toasterService.pop('success', 'Group Created', 'Please update the details accordingly!');
            this.groups.push(d);
            this.select(d);
        });
    }
    update(group: Group) {
        this.groupService.update(group).subscribe(d => {
            this.toasterService.pop('success', 'Group Updated');
            let i = this.groups.indexOf(group, 0);
            this.groups[i] = d;
        });
    }
    delete(group: Group) {
        this.groupService.delete(group).subscribe(d => {
            this.toasterService.pop('success', 'Group Deleted');
            let i = this.groups.indexOf(group, 0);
            if (i >= 0) {
                this.groups.splice(i, 1);
            }
            this.select(null);
        });
    }
}
