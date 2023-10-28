import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompanyService);
  });

  it('Testing Company Service Created Properly', () => {
    expect(service).toBeTruthy();
  });
});
