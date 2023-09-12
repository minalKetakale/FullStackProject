import { Component, OnInit } from '@angular/core';
import { Bus } from '../bus'
import { BusService } from '../bus.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  buses: Bus[] = [];
  travellersName: string="";
  source : string = "";
  destination : string ="";

  pageNo: number = 1;
  count: number = 5;
  selectedSearchType: string="";

  constructor(private busService: BusService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBus();
  }

  private getBus(){
    console.log("service");
    this.busService.getBusList().subscribe(data => {
      this.buses = data;

      //int num[]
      //int num1[]
      //num = num1
    });
  }

  busDetails(busId: number){
    this.router.navigate(['bus-details', busId]);
  }

  updateBus(busId: number){
    this.router.navigate(['update-bus', busId]);
  }

  deleteBus(busId: number){
    var status =  confirm("Are you sure to delete this records?");
    if(status == true){
    console.log(busId)
    this.busService.deleteBusDetailsById(busId).subscribe( data => {
      console.log(data);
      this.getBus();
    },
      
    error => {
      console.log(error);

    })
  }
  else{
    this.getBus();
  }

  }

  search(selectedSearchType:string){
    if(this.selectedSearchType ==='travellersName'){
      this.searchtravelsName();
  } else if(this.selectedSearchType ==='sourceDestination'){
    this.getBusDetailsBySrcDest();
  }
}

  getBusDetailsBySrcDest(){
    this.busService.findBySourceAndDestination(this.source,this.destination).subscribe(details =>{
      
      console.log('Response from service:',details);
       this.buses= details;
    },
        error => {
          console.log(error);
       });
      
   }


  
  searchtravelsName() : any{
    this.busService.findBytravelsName(this.travellersName).subscribe(details => {
      this.buses= details;
      console.log(details);
    },
      error => {
        console.log(error);
      });
  }


  removeAllBuses() : void{
    var status = confirm("Are you sure to delete all the records?");
    if (status == true) {
      this.busService.deleteAllBusDetails().subscribe(details => {
        console.log(details);
        this.getBus();
      },
        error => {
          console.log(error);
        })
    }
    else{
    this.getBus();
  }
  }

  getAcBus() {
    this.busService.findByAcDomain().subscribe({
      next: (bus1) => {
      console.log(bus1);
      this.buses = bus1;
    },
    error: (e) => console.error(e)
  });
  }

  getNonAcBus(){
    this.busService.findByNonAcDomain().subscribe({
      next: (bus1) => {
      console.log(bus1);
      this.buses = bus1;
    },
    error: (e) => console.error(e)
  });
  }


  sortBy(sort: string): void {

    switch (sort) {
      case 'costLow':
        this.busService.sortByCost("asc","cost").subscribe(details => {
          console.log("Response from service:",details);
          this.buses=details;
        },
          error =>{
            console.log(error);
        
        });
          break;
       

      case 'costHigh':
        this.busService.sortByCost("desc","cost").subscribe(details => {
         console.log("Response from service:",details);
         this.buses=details; 
          },
        error =>{
        console.log(error);
    
    });
    
        break;

      case 'ratingLow':
        this.busService.sortByRatings("asc","ratings").subscribe(details => {
          console.log("Response from service:",details);
          this.buses=details;
        },
          error =>{
            console.log(error);
        
        });
          break;
        
        
        
      case 'ratingHigh':
        this.busService.sortByRatings("desc","ratings").subscribe(details => {
        console.log("Response from service:",details);
        this.buses=details;
    },
        error => {
        console.log(error);
    
    });
    
        break;
        default:
         break;
  }
}

getUsersByBusId(busId?: number){
  
  

  var status = confirm("Are you sure to See this record?");
  if (status == true) {
  this.router.navigate(['user-list', busId]);
  }
  else{
    this.getBus();
    }
 
  }


}