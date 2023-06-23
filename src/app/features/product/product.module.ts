import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { RegisterComponent } from './register/register.component';
import { ListingComponent } from './listing/listing.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StarsPipe } from 'src/app/pipes/stars.pipe';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [RegisterComponent, ListingComponent, StarsPipe],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ProductModule {}
