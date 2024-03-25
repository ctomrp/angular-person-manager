import { Component, OnInit, inject } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { SexService } from '../../services/sex.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [DatePipe, RouterModule, LoaderComponent],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
})
export default class PersonListComponent implements OnInit {
  private personService = inject(PersonService);
  private sexService = inject(SexService);

  persons: any[] = [];
  sexes: any[] = [];
  showLoader: boolean = true;

  ngOnInit(): void {
    this.listPersons()
    this.listSexes();
  }

  listPersons(): void {
    this.personService.list().subscribe((persons: any) => {
      this.persons = persons;
      this.showLoader = false;
    });
  }

  listSexes(): void {
    this.sexService.list().subscribe((sexes: any) => {
      this.sexes = sexes;
    });
  }

  getSexName(id: number): string {
    const sex = this.sexes.find((sex) => sex.id === id);
    return sex ? sex.name : '';
  }

  deletePerson(id: number): void {
    this.personService.delete(id).subscribe(() => {
      this.persons = this.persons.filter((person) => person.id !== id);
    });
  }

  confirmBox(id: number) {
    Swal.fire({
      title: '¿Está seguro que desea borrar el registro?',
      text: 'La persona borrada no podrá ser recuperada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, mantener',
    }).then((result) => {
      if (result.value) {
        this.deletePerson(id);
        Swal.fire('Persona borrada', 'El registro fue eliminado', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Eliminación abortada',
          'El registro no fue eliminado',
          'error'
        );
      }
    });
  }
}
