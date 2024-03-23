import { Component, OnInit, inject } from '@angular/core';
import { SexService } from '../../services/sex.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export default class PersonFormComponent implements OnInit {
  private aroute = inject(ActivatedRoute);
  private fb = inject(FormBuilder)
  private personService = inject(PersonService);
  private router = inject(Router);
  private sexService = inject(SexService);

  person: any;
  sexes: any[] = [];
  title = 'Registrar';

  form = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    sex_id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    phone_number: ['',],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    birth_date: ['', [Validators.required,]],
    email: ['', [Validators.required, Validators.email]],
  })

  ngOnInit(): void {
    this.listSexes()

    const id = this.aroute.snapshot.paramMap.get('id');
    if(id){
      this.title = 'Editar';
      this.getPerson(parseInt(id));
    } 
  }

  getPerson(id: number): void {
    this.personService.get(id).subscribe((person: any) => {
        this.person = person;
        this.form.patchValue({
            first_name: person.first_name,
            last_name: person.last_name,
            dni: person.dni,
            sex_id: person.sex_id,
            phone_number: person.phone_number,
            address: person.address,
            birth_date: this.formatDate(person.birth_date),
            email: person.email,
        });
    });
}


  listSexes(): void {
    this.sexService.list().subscribe((sexes: any) => {
      this.sexes = sexes;        
    });
  }

  onSubmit() {
    const person = this.form.value;
    
    person.birth_date = this.formatDate(person.birth_date);

    if (this.person) {
        this.updatePerson(this.person.id, person);
    } else {
        this.createPerson(person);
    }
}

formatDate(date: Date | string | null | undefined): string {
  if (!date) {
      return '';
  }

  if (typeof date === 'string') {
      date = new Date(date);
  }

  if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
  }

  return date.toISOString().slice(0, 10);
}


  createPerson(person: any) {
    this.personService.create(person).subscribe(() => this.router.navigate(['/']));
  }

  updatePerson(id: number, person: any) {
    this.personService.update(id, person).subscribe(() => this.router.navigate(['/']));
  }

}
