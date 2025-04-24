import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadSectionsPage } from './downloadsections.page';

describe('DownloadPage', () => {
  let component: DownloadSectionsPage;
  let fixture: ComponentFixture<DownloadSectionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
