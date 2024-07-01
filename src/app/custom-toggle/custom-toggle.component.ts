import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-toggle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-toggle.component.html',
  styleUrl: './custom-toggle.component.css',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CustomToggleComponent),
			multi: true
		}
	]
})
export class CustomToggleComponent implements ControlValueAccessor {
	private _isToggled: boolean = false;

	onChange = (isToggled: boolean) => {};
	onTouched = () => {};

	get isToggled(): boolean {
		return this._isToggled;
	}

	set isToggled(value: boolean) {
		this._isToggled = value;
		this.onChange(this._isToggled);
		this.onTouched();
	}

	writeValue(value: boolean): void {
		this._isToggled = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		// Handle the disabled state if needed
	}

	onToggle(): void {
		this.isToggled = !this.isToggled;
	}
}
