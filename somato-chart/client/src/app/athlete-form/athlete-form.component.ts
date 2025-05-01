import { Component, effect, EventEmitter, input, Output } from "@angular/core";
import { Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Athlete } from "../athlete";
import { CoordinateService } from "../services/coordinate.service";

@Component({
  selector: "app-athlete-form",
  templateUrl: "athlete-form.component.html",
  styleUrls: ["athlete-form.component.css"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
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
    endo: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
    mezo: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
    ecto: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
    symbol: ["circle", [Validators.required]],
    color: ["blue", [Validators.required]],
    x: [0],
    y: [0],
    isVisible: [true],
  });

  constructor(
    private formBuilder: FormBuilder,
    private coodinateService: CoordinateService
  ) {
    effect(() => {
      this.athleteForm.setValue({
        name: this.initialState()?.name || "",
        endo: this.initialState()?.endo || null,
        mezo: this.initialState()?.mezo || null,
        ecto: this.initialState()?.ecto || null,
        symbol: this.initialState()?.symbol || "circle",
        color: this.initialState()?.color || "blue",
        x: this.initialState()?.x || 0,
        y: this.initialState()?.y || 0,
        isVisible: this.initialState()?.isVisible ?? true,
      });
    });
  }

  ngOnInit(): void {
    this.subscribeToValueChanges(
      ["endo", "mezo", "ecto"],
      this.calculateCoordinates.bind(this)
    );
  }

  private subscribeToValueChanges(
    controls: string[],
    callback: () => void
  ): void {
    controls.forEach((controlName) => {
      this.athleteForm.get(controlName)?.valueChanges.subscribe(callback);
    });
  }

  private calculateCoordinates(): void {
    const endo = this.endo?.value || 0;
    const mezo = this.mezo?.value || 0;
    const ecto = this.ecto?.value || 0;

    const { x, y } = this.coodinateService.calculateCoordinates(
      endo,
      mezo,
      ecto
    );

    this.x?.setValue(x, { emitEvent: false });
    this.y?.setValue(y, { emitEvent: false });
  }

  getControl(controlName: string) {
    return this.athleteForm.get(controlName)!;
  }

  get name() {
    return this.getControl("name");
  }
  get endo() {
    return this.getControl("endo");
  }
  get mezo() {
    return this.getControl("mezo");
  }
  get ecto() {
    return this.getControl("ecto");
  }
  get symbol() {
    return this.getControl("symbol");
  }
  get color() {
    return this.getControl("color");
  }
  get x() {
    return this.getControl("x");
  }
  get y() {
    return this.getControl("y");
  }
  get isVisible() {
    return this.getControl("isVisible");
  }

  toggleVisibility(): void {
    const currentValue = this.isVisible.value;
    this.isVisible.setValue(!currentValue);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  submitForm(): void {
    this.formSubmitted.emit(this.athleteForm.value as Athlete);
  }
}
