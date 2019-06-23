import { Component, OnInit } from '@angular/core';
import { AddDocumentService } from './add-document.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  private ifAnyError: boolean;
  private errorAlertMessage: string;
  private sso: string;
  private url: string;
  private fileDesc: string;
  private allfiles = [];
  private uploader: FileUploader;

  constructor(private addDocumentService: AddDocumentService, private activatedRoute: ActivatedRoute) { 
    this.url = 'http://localhost:5050/upload';
    this.sso = '';
    this.fileDesc = '';
  }

  ngOnInit() {
    const params: any = this.activatedRoute.snapshot.params;
    this.sso = params.id;
    this.fetchFileList();
    this.uploader = new FileUploader({url: this.url});
    this.ifAnyError = false;
    this.errorAlertMessage = '';
  }

  /**
   * Desc: Calls the API via service getAllFiles() and populates
   * an array with the file objects, which is displayed in page
   */
  fetchFileList(): void {
    this.allfiles = [];
    this.addDocumentService.getAllFiles(this.sso).subscribe((response: any[]) => {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
          this.allfiles[i] = {
            sl: response[i].sl,
            filename: response[i].filename,
            originalname: response[i].originalname,
            contentType: response[i].contentType,
            desc: response[i].description
        };
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
    });
  }

  /**
   * Catches the selected docs name
   * @param target : target component
   */
  selectFile(target): void {
    const labelToDisplay = document.getElementById('inputGroupLable');
    labelToDisplay.textContent = target.files[0].name;
  }

  /**
   * Calls the upload API through the uploader, after adding
   * two more data i.e. description & sso
   */
  uploadAndResetForm(): void {
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('description', this.fileDesc);
      form.append('sso', this.sso);
    };
    this.uploader.uploadAll();
    this.fileDesc = '';
    document.getElementById('inputGroupLable').textContent = '';
    alert('Selected document is uploaded successfully!!');

    setTimeout(() => {
      this.fetchFileList();
    }, 1000);
  }

  /**
   * Calls the download API and saves the downloaded file in drive.
   * This menthod uses the file-saver library
   * @param pFileName : File ID
   * @param pFileOriginalName : Original File Name
   * @param pContentType : File Type
   */
  downloadDoc(pFileName, pFileOriginalName, pContentType): void {
    this.addDocumentService.downloadSingleFile(pFileName, pContentType).subscribe(
      (blobres: any) => {
        importedSaveAs(blobres, pFileOriginalName);
      }
    );
  }

  /**
   * Calls the delete API to remove the file
   * @param pFilename : File ID
   */
  deleteDoc(pFilename): void {
    this.addDocumentService.delFile(pFilename).subscribe(
      (res: any) => {
        this.fetchFileList();
        alert('Selected document is removed successfully!!');
      }
    );
  }
}
