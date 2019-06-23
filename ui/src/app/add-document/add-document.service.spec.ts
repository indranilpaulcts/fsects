import { TestBed } from '@angular/core/testing';

import { AddDocumentService } from './add-document.service';

describe('AddDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddDocumentService = TestBed.get(AddDocumentService);
    expect(service).toBeTruthy();
  });
});
