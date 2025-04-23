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
  templateUrl: "athlete-form.component.html",
  styleUrls: ["athlete-form.component.css"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AthleteFormComponent {
  initialState = input<Athlete>();

  @Output()
  formValuesChanged = new EventEmitter<Athlete>();

  @Output()
  formSubmitted = new EventEmitter<Athlete>();

  athleteForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    endo: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    mezo: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    ecto: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    symbol: ["circle", [Validators.required]],
    fillColor: ["blue", [Validators.required]],
    x: [0],
    y: [0],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.athleteForm.setValue({
        name: this.initialState()?.name || "",
        endo: this.initialState()?.endo || null,
        mezo: this.initialState()?.mezo || null,
        ecto: this.initialState()?.ecto || null,
        symbol: this.initialState()?.symbol || "circle",
        fillColor: this.initialState()?.fillColor || "blue",
        x: this.initialState()?.x || 0,
        y: this.initialState()?.y || 0,
      });
    });
  }

  ngOnInit(): void {
    this.endo?.valueChanges.subscribe(() => this.calculateCoordinates());
    this.mezo?.valueChanges.subscribe(() => this.calculateCoordinates());
    this.ecto?.valueChanges.subscribe(() => this.calculateCoordinates());
  }

  private calculateCoordinates(): void {
    const endo = this.endo?.value || 0;
    const mezo = this.mezo?.value || 0;
    const ecto = this.ecto?.value || 0;

    const factor = 100;

    this.x?.setValue(Math.round((ecto - endo) * factor) / factor, {
      emitEvent: false,
    });
    this.y?.setValue(Math.round((2 * mezo - (endo + ecto)) * factor) / factor, {
      emitEvent: false,
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
  get symbol() {
    return this.athleteForm.get("symbol")!;
  }
  get fillColor() {
    return this.athleteForm.get("fillColor")!;
  }
  get x() {
    return this.athleteForm.get("x")!;
  }
  get y() {
    return this.athleteForm.get("y")!;
  }

  submitForm(): void {
    this.formSubmitted.emit(this.athleteForm.value as Athlete);
  }
}
