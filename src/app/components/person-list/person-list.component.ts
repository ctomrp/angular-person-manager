import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { SexService } from '../../services/sex.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
})
export default class PersonListComponent implements OnInit {
  private personService = inject(PersonService);
  private sexService = inject(SexService);

  persons: any[] = [];
  sexes: any[] = [];

  ngOnInit(): void {
    this.listPersons()
    this.listSexes()
  }

  listPersons(): void {
    this.personService.list().subscribe((persons: any) => {
      this.persons = persons;    
    });
  }

  listSexes(): void {
    this.sexService.list().subscribe((sexes: any) => {
      this.sexes = sexes;
    });
  }

  getSexName(id: number): string {
    const sex = this.sexes.find(sex => sex.id === id);
    return sex ? sex.name : '';
  }

  deletePerson(id: number): void {
    this.personService.delete(id).subscribe(() => {
      this.persons = this.persons.filter((person) => person.id !== id);
    });
  }

}
