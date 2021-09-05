import {ChangeDetectionStrategy, Component} from '@angular/core';

import {Pet, PetService} from 'pet-store-data-access';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";

export type PetStatus = 'available' | 'pending' | 'sold';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public pets$: Observable<Array<Pet>>;
  public petStatus$: Observable<PetStatus>;
  public form: FormGroup;

  public constructor(
    private readonly petService: PetService,
    private readonly formBuilder: FormBuilder
  ) {

    this.form = formBuilder.group({
      status: formBuilder.control('available')
    });

    const formControl = this.form.get('status') as FormControl;

    this.petStatus$ = formControl.valueChanges
      .pipe(
        startWith('available'),
        map(_ => this.form.get('status')?.value as PetStatus ?? 'available'),
        distinctUntilChanged()
    );

    this.pets$ = this.petStatus$.pipe(
      switchMap((status) => this.petService.findPetsByStatus({status}))
    );

  }

}
