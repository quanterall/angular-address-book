import { Component, OnInit } from '@angular/core';
import { UserService, GroupedUser } from '../../services/user.service';
import { DialogService } from '../../services/dialog.service';
import { ToastService, toastTypes } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form',
  templateUrl: `./form.component.html`,
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  users: GroupedUser[] = [];
  selectedUsers: GroupedUser[] = [];
  nonDuplicatedUsers: GroupedUser[] = [];
  isValidEmail!: boolean;
  term: string = '';

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = this.userService.groupDataByGroup(users);
    });
  }

  onChange(items: GroupedUser[]) {
    console.log(items);
    this.nonDuplicatedUsers = Object.values(
      items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
    );
  }

  clearItem(event: any) {
    console.log(this.selectedUsers);
    this.selectedUsers = this.selectedUsers.filter(
      (selectedUser) => selectedUser.email !== event.value.email
    );
    this.onChange(this.selectedUsers);
  }

  searchFn = (term: string, item: GroupedUser) => {
    term = term.toLocaleLowerCase();
    this.term = term;
    return (
      item.name.toLocaleLowerCase().includes(term) ||
      item.email.toLocaleLowerCase().includes(term) ||
      item.groups.toLocaleLowerCase().includes(term)
    );
  };
  addTag = (term: string) => {
    if (!this.isEmail(term)) {
      this.isValidEmail = false;
      return false;
    } else {
      this.isValidEmail = true;
      return { email: term };
    }
  };

  onClose() {
    this.dialogService.showDialog = false;
  }
  onSubmit() {
    if (this.selectedUsers.length === 0) {
      return;
    }
    this.dialogService.showDialog = false;
    this.toastService.initiate({
      title: `Invitation Sent for: ${this.dialogService.getInstrumentName()}`,
      content: `You have invited ${formatSelectedUsers(this.selectedUsers)}`,
    });
  }
  isEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  alreadyExist(email: string) {
    return this.selectedUsers.some(
      (selectedUser) => selectedUser.email === email
    );
  }
}

function formatSelectedUsers(users: GroupedUser[]) {
  return users.map((user) => user.email).join(', ');
}
