import { Component } from '@angular/core';
import { PlantaListResponse } from '../model/plantaListResponse';
import { PlantaService } from '../service/planta.service';
import { NgFor, NgIf } from '@angular/common';
import { PlantaDTO } from '../model/plantaDto';
import { FormsModule } from '@angular/forms';
import { PaisesDTO } from '../model/paisesDto';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  plantas: PlantaListResponse[] = [];
  paises: any[] = [];
  //para obtener el id y nombre user del jwt al hacer login
  userId!: number;
  userNombre!: string;
  userApellido: string | undefined;

  planta: PlantaDTO = {
    id:0,
    nombrePlanta: '',
    pais: ''
  }
  selectedPlanta:PlantaDTO = {
    id:0,
    nombrePlanta: '',
    pais: ''
  } ;
  errorMessage!: string;

       

  constructor(private plantaService: PlantaService, private toastr: ToastrService,
              private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateDashboardData();   
    this.getAllPaises();   
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  getIdNombreApellidoByToken(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userId;     
      this.userNombre = decodedToken.userNombre;    
      this.userApellido = decodedToken.userApellido;      
    }
  }

  updateDashboardData(): void {
    this.getAllPlantas();
    this.getAllLecturas();
    this.getAllAlertMed();
    this.getAllAlertasRojas();
    this.getAllSensoresDeshabilitados();
    this.getIdNombreApellidoByToken();
  }

  getAllPlantas(){
  this.plantaService.obtenerTodasLasPlantas().subscribe(
    (data: PlantaListResponse[]) => {
      this.plantas = data;
      //console.log("All plantas:",data)
    },
    (error) => {
      console.error('Error al obtener plantas:', error);
    }
  );
}


getAllPaises(): void {
  this.plantaService.obtenerPaises().subscribe((data: any[]) => {
    this.paises = data;
    //console.log("paises:",data)
  });
}

getAllLecturas(): void {
  this.plantaService.getLecturas().subscribe(
    (data) => {
      this.lecturas = data.lecturas; // Ajusta según la estructura de tu respuesta
    },
    (error) => {
      console.error('Error al obtener las lecturas:', error);
    }
  );
}

getAllAlertMed(): void {
  this.plantaService.getAlertMedias().subscribe(
    (data) => {
      this.alertasMedias = data.alertasMedias; // Ajusta según la estructura de tu respuesta
    },
    (error) => {
      console.error('Error al obtener alertas medias:', error);
    }
  );
}

getAllAlertasRojas(): void {
  this.plantaService.getAlertasRojas().subscribe(
    (data) => {
      this.alertasRojas = data.alertasRojas; // Ajusta según la estructura de tu respuesta
    },
    (error) => {
      console.error('Error al obtener alertas rojas:', error);
    }
  );
}

getAllSensoresDeshabilitados(): void {
  this.plantaService.getAllSensoresDeshabilitados().subscribe(
    (data) => {
      this.sensoresDeshabilitados = data.sensoresDeshabilitados; // Ajusta según la estructura de tu respuesta
    },
    (error) => {
      console.error('Error al obtener Sensores Deshabilitados:', error);
    }
  );
}


//modal crear
showModal = false;

  // Variables para almacenar los datos del formulario
  nombrePlanta = '';
  paisSeleccionado = '';
  isFormValid: boolean = false;

  // Abrir el modal
  openModal() {    
    this.showModal = true;    
  }

  // Cerrar el modal
  closeModal() {
    this.showModal = false;
    
  }

  // Método para crear una planta (por ahora solo cierra el modal)
  selectedCountry: string = '';
  crearPlanta() {
    // Almacenar el país seleccionado antes de enviar la solicitud
    this.selectedCountry = this.planta.pais;
    if (this.planta.pais) {
      this.planta.pais = this.planta.pais.toUpperCase();
    }
    this.plantaService.crearPlanta(this.planta).subscribe(response => {   
      this.updateDashboardData();
      this.toastr.success('Planta creada con éxito!!', 'Éxito', {
        positionClass: 'toast-top-center',
      });
      this.closeModal();
    }, 
    (error) => { 
       // Restaurar el valor seleccionado en caso de error
       this.planta.pais = this.selectedCountry;     
      this.toastr.error(error.error, 'Error', {
        positionClass: 'toast-top-center'
      });      
     
    });
  }
  

  validateForm() {
    this.isFormValid = this.planta.nombrePlanta.trim() !== '' && this.planta.pais.trim() !== '';
  }

  //PARA EDITAR PLANTA

  showEditModal: boolean = false;
  pais: string = '';
  lecturas: number = 0;
  alertasMedias: number = 0;
  alertasRojas: number = 0;
  sensoresDeshabilitados: number = 0;

  openEditModal(planta: any): void {
    this.selectedPlanta = { ...planta }; // Clonar el objeto planta para evitar mutaciones
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  editarPlanta(): void {
    if (!this.selectedPlanta || !this.selectedPlanta.id) {
      this.errorMessage = 'No se seleccionó una planta para editar.';
      return;
    }
    this.plantaService.editarPlanta(this.selectedPlanta.id, this.selectedPlanta).subscribe(
      () => {
        this.toastr.success('Planta actualizada con éxito!!', 'Éxito', {
          positionClass: 'toast-top-center',
        });        
        this.updateDashboardData();
        this.closeEditModal();       
      },
      (error) => {       
      this.toastr.error(error.error, 'Error', {
        positionClass: 'toast-top-center'
      });       
       // console.error('Error editing plant', error);
      }
    );
  }



}



