import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientService } from "src/app/Shared/Services/client.service";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientRequestDto } from "src/app/Shared/DTOs/Clients/client-request-dto";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})

export class ClientFormComponent implements OnInit {

  @Input() ClientIdForEdit: number | null = null;

  @Output() getClienttsHandler = new EventEmitter();

  ClientForm!: FormGroup;
  UpdateClientLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public modalService: NgbModal,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.createClientForm();
    this.getClientForEdit();
  }

  //#region ngOnInit Functions
  createClientForm() {
    this.ClientForm = this.fb.group({
      firstName: this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      lastName: this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      email: this.fb.control(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(100)]),
      phoneNumber: this.fb.control(null, [Validators.required, Validators.minLength(11), Validators.maxLength(13)]),
    });
  }

  getClientForEdit(): void {
    if (this.ClientIdForEdit && this.ClientIdForEdit > 0) {
      this.clientService.getClientById(this.ClientIdForEdit!).subscribe({
        next: client => {
          this.ClientForm.patchValue(client.data);
        }
      });
    }
  }
  //#endregion

  //#region Operation Functions
  saveClient(clientForm: ClientRequestDto): void {
    this.UpdateClientLoading = true;
    if (this.ClientIdForEdit) {
      this.clientService.updateClient(this.ClientIdForEdit, clientForm).subscribe({
        next: client => {
          this.getClienttsHandler.emit();
          this.modalService.dismissAll();
          this.ClientForm.reset();
        },
        error: err => {
          this.UpdateClientLoading = false;
        },
        complete: () => {
          Swal.fire(
            'Successfully',
            'Client Updated Successfully.',
            'success'
          );
        }
      });
    } else {
      this.clientService.addNewClient(clientForm).subscribe({
        next: client => {
          this.getClienttsHandler.emit();
          this.modalService.dismissAll();
          this.ClientForm.reset();
        },
        error: err => {
          this.UpdateClientLoading = false;
        },
        complete: () => {
          Swal.fire(
            'Successfully',
            'Client Added Successfully.',
            'success'
          );
        }
      });
    }
  }
  //#endregion

  //#region Department Form Controls
  get firstNameCtr() {
    return this.ClientForm.get('firstName') as FormControl
  }

  get lastNameCtr() {
    return this.ClientForm.get('lastName') as FormControl
  }

  get emailCtr() {
    return this.ClientForm.get('email') as FormControl
  }

  get phoneNumberCtr() {
    return this.ClientForm.get('phoneNumber') as FormControl
  }
  //#endregion

}