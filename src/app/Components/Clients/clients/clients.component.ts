import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from "src/app/Shared/Services/client.service";
import { PaginationResponse } from "src/app/Shared/DTOs/Base/pagination-response";
import { ClientResponseDTO } from "src/app/Shared/DTOs/Clients/client-response-dto";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  @ViewChild("EditClient") EditClient!: NgbModal;

  ClientsResponse!: PaginationResponse<ClientResponseDTO>;
  TempClientIdForEdit: number = 0;

  constructor(
    public modalService: NgbModal,
    public clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.getClientsList();
  }

  //#region ngOnInit Functions
  getClientsList(): void {
    this.clientService.getListOfClients().subscribe({
      next: clients => {
        this.ClientsResponse = clients;
      }
    });
  }
  //#endregion

  //#region Helper Functions
  getDataForEdit(client: ClientResponseDTO) {
    this.TempClientIdForEdit = client.id;
    this.modalService.open(this.EditClient, { size: 'lg', ariaLabelledBy: 'modal-basic-title', backdrop: true });
  }

  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe({
      complete: () => {
        this.getClientsList();
        Swal.fire(
          'Successfully',
          'Client deleted Successfully.',
          'success'
        );
      }
    });
  }
  //#endregion

}