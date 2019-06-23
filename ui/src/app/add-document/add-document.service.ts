import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddDocumentService {

  private uriBase: string;
  private apiGetDoc: string;
  private apiGetAllDocs: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5050/';
    this.apiGetDoc = 'file/';
    this.apiGetAllDocs = 'files/';
  }

  downloadSingleFile(pFilename: string, pContentType: string) {
    const fullUrl = this.uriBase + this.apiGetDoc + pFilename;
    return this.httpConnection.get(fullUrl, { headers: new HttpHeaders({
      'Content-Type': pContentType,
    }), responseType: 'blob'});
  }

  getAllFiles(pSSOID: string) {
    const fullUrl = this.uriBase + this.apiGetAllDocs + pSSOID;
    return this.httpConnection.get(fullUrl);
  }

  delFile(pFileId: string) {
    const fullUrl = this.uriBase + this.apiGetDoc + pFileId;
    return this.httpConnection.delete(fullUrl);
  }

}
