import { Component, effect, EventEmitter, input, Output } from "@angular/core";
import { Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { Athlete } from "../athlete";

@Component({
  selector: "app-athlete-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .athlete-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="athlete-form"
      autocomplete="off"
      [formGroup]="athleteForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        @if (name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Endomorphy</mat-label>
        <input
          matInput
          placeholder="Endomorphy"
          formControlName="endo"
          type="number"
          required
        />
        @if (endo.invalid) {
        <mat-error>Endomorphy is required.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Mezomorphy</mat-label>
        <input
          matInput
          placeholder="Mezomorphy"
          formControlName="mezo"
          type="number"
          required
        />
        @if (mezo.invalid) {
        <mat-error>Mezomorphy is required.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Ectomorphy</mat-label>
        <input
          matInput
          placeholder="Ectomorphy"
          formControlName="ecto"
          type="number"
          required
        />
        @if (ecto.invalid) {
        <mat-error>Ectomorphy is required.</mat-error>
        }
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="athleteForm.invalid"
      >
        Save
      </button>
    </form>
  `,
})
export class AthleteFormComponent {
  initialState = input<Athlete>();

  @Output()
  formValuesChanged = new EventEmitter<Athlete>();

  @Output()
  formSubmitted = new EventEmitter<Athlete>();

  athleteForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    endo: [0, [Validators.required]],
    mezo: [0, [Validators.required]],
    ecto: [0, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.athleteForm.setValue({
        name: this.initialState()?.name || "",
        endo: this.initialState()?.endo || null,
        mezo: this.initialState()?.mezo || null,
        ecto: this.initialState()?.ecto || null,
      });
    });
  }

  get name() {
    return this.athleteForm.get("name")!;
  }
  get endo() {
    return this.athleteForm.get("endo")!;
  }
  get mezo() {
    return this.athleteForm.get("mezo")!;
  }
  get ecto() {
    return this.athleteForm.get("ecto")!;
  }

  submitForm() {
    this.formSubmitted.emit(this.athleteForm.value as Athlete);
  }
}
