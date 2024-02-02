import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsPublicComponent } from './recipe-details-public.component';

describe('RecipeDetailsPublicComponent', () => {
  let component: RecipeDetailsPublicComponent;
  let fixture: ComponentFixture<RecipeDetailsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailsPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeDetailsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
