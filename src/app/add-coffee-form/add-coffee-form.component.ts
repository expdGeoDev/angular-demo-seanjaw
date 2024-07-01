import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessNotificationComponent } from '../success-notification/success-notification.component';
import { CoffeeHttpService } from '../coffee-http.service';
import { CustomToggleComponent } from '../custom-toggle/custom-toggle.component';

@Component({
  selector: 'app-add-coffee-form',
  standalone: true,
	imports: [ReactiveFormsModule, CommonModule, SuccessNotificationComponent, CustomToggleComponent],
  templateUrl: './add-coffee-form.component.html',
  styleUrl: './add-coffee-form.component.css'
})
export class AddCoffeeFormComponent {

	coffeeForm: FormGroup
	roastTypes = ['light', 'medium', 'dark']
	grindSettings = [
		{ value: 1, label: '1- Very Fine' },
		{ value: 2, label: '2- Very-Fine to Fine' },
		{ value: 3, label: '3- Fine' },
		{ value: 4, label: '4- Medium' },
		{ value: 5, label: '5- Medium-Coarse' },
		{ value: 6, label: '6- Coarse' },
		{ value: 7, label: '7- Very Coarse' }
	];
	notificationMessage: string = '';
	constructor(private fb: FormBuilder, private coffeeService: CoffeeHttpService){
		this.coffeeForm = this.fb.group({
			brand: ['', Validators.required],  // Initialize brand with empty string and required validator
			roast: ['', Validators.required],  // Initialize roast with empty string and required validator
			groundOrBeans: ['', Validators.required],  // Initialize groundOrBeans with empty string and required validator
			grind: [null],  // Initialize grindSetting with empty string
			singleOrigin: [false],  // Initialize singleOrigin with false (boolean)
			flavorNotes: ['']  // Initialize flavorNotes with empty string
		});
	}
	onSubmit() {

		console.log(this.coffeeForm.value);
		if (this.coffeeForm.valid){
			this.coffeeService.getAllBeans().subscribe({
				next: coffees => {
					const newCoffee = {
						id: this.coffeeService.generateNextId(coffees),
						...this.coffeeForm.value
					};
					console.log("newcoffee", newCoffee);
					this.coffeeService.addCoffee(newCoffee).subscribe({
						next: response => {
							console.log("response", response);
							this.notificationMessage = 'Coffee data added successfully! ';
							this.coffeeForm.reset();
						},
						error: error =>{
							console.error("Error adding coffee", error)
						},
						complete: () => {
							console.log("Add coffee request completed")
						}
					});
				},
				error: error =>{
					console.error("Error adding coffees", error)
				},
				complete: () => {
					console.log("Fetched coffee request completed")
				}
			})
		}
		console.log(this.coffeeService.getAllBeans());
	}
	onReset(){
		this.coffeeForm.reset();
		this.notificationMessage = '';
	}

}
