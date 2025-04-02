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
    name: ["", [Validators.required, Validators.minLength(3)]],
    endo: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
    mezo: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
    ecto: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
    seriesSymbol: ["circle", [Validators.required]],
    seriesColor: ["blue", [Validators.required]],
    xAxisCoordinate: [0],
    yAxisCoordinate: [0],
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
        xAxisCoordinate: this.initialState()?.xAxisCoordinate || 0,
        yAxisCoordinate: this.initialState()?.yAxisCoordinate || 0,
      });
    });
  }

  ngOnInit() {
    this.endo?.valueChanges.subscribe(() => this.calculateCoordinates());
    this.mezo?.valueChanges.subscribe(() => this.calculateCoordinates());
    this.ecto?.valueChanges.subscribe(() => this.calculateCoordinates());
  }

  private calculateCoordinates() {
    const endo = this.endo?.value || 0;
    const mezo = this.mezo?.value || 0;
    const ecto = this.ecto?.value || 0;

    const x = ecto - endo;
    const y = 2 * mezo - (endo + ecto);
    
    this.xAxisCoordinate?.setValue(x, { emitEvent: false});
    this.yAxisCoordinate?.setValue(y, { emitEvent: false})
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
  get xAxisCoordinate() {
    return this.athleteForm.get("xAxisCoordinate")!;
  }
  get yAxisCoordinate() {
    return this.athleteForm.get("yAxisCoordinate")!;
  }

  submitForm() {
    this.formSubmitted.emit(this.athleteForm.value as Athlete);
  }
}
