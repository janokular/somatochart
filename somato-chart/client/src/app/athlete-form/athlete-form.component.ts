import { Component, effect, EventEmitter, input, Output } from "@angular/core";
import { Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
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
    MatIconModule,
  ],
  styles: `
    .athlete-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
      width: 20rem;
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
          min="1"
          max="7"
          step="0.01"
          required
        />
        @if (endo.invalid) {
        <mat-error>Endomorphy must be in range from 1 to 7.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Mezomorphy</mat-label>
        <input
          matInput
          placeholder="Mezomorphy"
          formControlName="mezo"
          type="number"
          min="1"
          max="7"
          step="0.01"
          required
        />
        @if (mezo.invalid) {
        <mat-error>Mezomorphy must be in range from 1 to 7.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Ectomorphy</mat-label>
        <input
          matInput
          placeholder="Ectomorphy"
          formControlName="ecto"
          type="number"
          min="1"
          max="7"
          step="0.01"
          required
        />
        @if (ecto.invalid) {
        <mat-error>Ectomorphy must be in range from 1 to 7.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Series Symbol</mat-label>
        <select matNativeControl formControlName="seriesSymbol" required>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Series Color</mat-label>
        <select matNativeControl formControlName="seriesColor" required>
          <option value="blue">Blue</option>
          <option value="orange">Orange</option>
          <option value="purple">Purple</option>
        </select>
      </mat-form-field>
      <br />
      <button mat-raised-button type="submit" [disabled]="athleteForm.invalid">
        <mat-icon>save</mat-icon>
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
    endo: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
    mezo: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
    ecto: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
    seriesSymbol: ["circle", [Validators.required]],
    seriesColor: ["blue", [Validators.required]],
    xAxisCoordinate: 0,
    yAxisCoordinate: 0,
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.athleteForm.setValue({
        name: this.initialState()?.name || "",
        endo: this.initialState()?.endo || null,
        mezo: this.initialState()?.mezo || null,
        ecto: this.initialState()?.ecto || null,
        seriesSymbol: this.initialState()?.seriesSymbol || "circle",
        seriesColor: this.initialState()?.seriesColor || "blue",
        // xAxisCoordinate:
        //   <number>this.initialState()?.ecto - <number>this.initialState()?.endo,
        // yAxisCoordinate:
        //   2 * <number>this.initialState()?.mezo -
        //   (<number>this.initialState()?.endo +
        //     <number>this.initialState()?.ecto),
        xAxisCoordinate: 0,
        yAxisCoordinate: 0,
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
  get seriesSymbol() {
    return this.athleteForm.get("seriesSymbol")!;
  }
  get seriesColor() {
    return this.athleteForm.get("seriesColor")!;
  }

  submitForm() {
    this.formSubmitted.emit(this.athleteForm.value as Athlete);
  }
}
