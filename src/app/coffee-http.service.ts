import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from '../data/coffee-data';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CoffeeHttpService {
	baseUrl = 'http://localhost:8000';
	constructor(private client: HttpClient) {}

	getAllBeans(): Observable<Coffee[]> {
		return this.client.get<Coffee[]>(`${this.baseUrl}/coffee`);
	}

	addCoffee(coffee: Coffee): Observable<Coffee> {
		return this.client.post<Coffee>(`${this.baseUrl}/coffee`, coffee);
	}

	generateNextId(coffees: Coffee[]): number | undefined {
		return coffees.length > 0 ? Math.max(...coffees.map(coffee => coffee.id)) + 1 : 1;
	}
}
