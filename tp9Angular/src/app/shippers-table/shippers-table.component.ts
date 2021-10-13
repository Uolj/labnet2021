import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shipper } from '../models/Shipper.model';
import { ShipperInfoService } from '../services/shipper-info.service';
import { ShippersService } from '../services/shippers.service';

@Component({
  selector: 'app-shippers-table',
  templateUrl: './shippers-table.component.html',
  styleUrls: ['./shippers-table.component.scss'],
})
export class ShippersTableComponent implements OnInit {
  public shippersList: Array<Shipper> = [];
  constructor(
    private router: Router,
    private shippersService: ShippersService,
    private shipperInfo: ShipperInfoService
  ) {}

  ngOnInit(): void {
    this.getShippers();
  }

  btnRedirectToAdd() {
    this.router.navigateByUrl('/AddShipper');
  }

  getShippers() {
    this.shippersService.getShippers().subscribe(
      (response) => (this.shippersList = response),
      (error) => alert(`unable to read database, ${error}`)
    );
  }

  takeShipperToUpdate(shipper: Shipper) {
    this.shipperInfo.sendShipper(shipper);
    this.btnRedirectToAdd();
  }

  deleteShipper(shipperID: number) {
    this.shippersService.deleteShipper(shipperID).subscribe(
      () => this.ngOnInit(),
      (error) => alert(`you cannot delete this record, ${error}`)
    );
  }
}
