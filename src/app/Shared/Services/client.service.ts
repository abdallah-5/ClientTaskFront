import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { SingleResponse } from "../DTOs/Base/single-response";
import { ClientRequestDto } from "../DTOs/Clients/client-request-dto";
import { PaginationResponse } from "../DTOs/Base/pagination-response";
import { ClientResponseDTO } from "../DTOs/Clients/client-response-dto";
import { BaseSuccessResponse } from "../DTOs/Base/base-success-response";

@Injectable({ providedIn: 'root' })

export class ClientService {

  constructor(private httpClient: HttpClient) { }

  getListOfClients(): Observable<PaginationResponse<ClientResponseDTO>> {
    return this.httpClient.get<PaginationResponse<ClientResponseDTO>>(`${environment.apiUrl}/client/getClients`);
  }

  getClientById(clientId: number) {
    return this.httpClient.get<SingleResponse<ClientResponseDTO>>(`${environment.apiUrl}/client/getClientById/${clientId}`);
  }

  addNewClient(requestBody: ClientRequestDto) {
    return this.httpClient.post<SingleResponse<ClientResponseDTO>>(`${environment.apiUrl}/client/createClient`, requestBody);
  }

  updateClient(clientId: number, requestBody: ClientRequestDto) {
    return this.httpClient.put<SingleResponse<ClientResponseDTO>>(`${environment.apiUrl}/client/updateClient/${clientId}`, requestBody);
  }

  deleteClient(clientId: number) {
    return this.httpClient.delete<BaseSuccessResponse>(`${environment.apiUrl}/client/deleteClient/${clientId}`);
  }

}