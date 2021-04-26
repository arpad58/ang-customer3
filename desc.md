ang-customer-all+ filter+sorter
 Documents\aaaz6vizsgagyakorlas\ang-customer3-page2-updateid\ang-customer3
CustomerService
3. Feladat
Hozzon létre egy Angular alkalmazást tetszőleges helyen (nem kötött a név).
Legyen benne három réteg: class -> service -> component.
Az élő json szerverről kérje le a vásárlókat.
A szerver elérhetősége: https://nettuts.hu/jms/<githubname>/customers (a helyére kerüljön az ön github user -neve)
https://nettuts.hu/jms/arpad58/customers 
Értelmezze a szerveren elérhető vásárlókat és azok alapján hozza létre a szükséges osztályokat.
Készítsen egy teljes értékű CRUD -ot (getAll, get, create, update, delete) egy megfelelő service -ben.
................................................................................
4. Feladat
Az adatokat táblázatos formában jelenítse meg a főoldalon.
Minden sorhoz tartozzon egy törlés gomb.
A törlés gombra kattintva törlődjön az adatbázisból az adott entitás és frissüljön a táblázat.
.............................................................................
5. Feladat
Legyen egy űrlap, ahol fel lehet venni új entitást (most Customer).
Ezt az űrlapot egy gombról lehessen megnyitni, ami a táblázat felett található.
A gomb egy új űrlapra navigáljon, ahol bevihetőek az új entitás adatai.
Az adatok értelemszerűen legyenek validálva, minden adat kötelező legyen.
Alkalmazzon szabványos Angular Routing -ot az oldalak váltására.
..............................................................................
6. Feladat
A kész Angular alkalmazást publikálja a saját Github oldalán. https://<githubname>.github.io


??????????????????????????????????????????????????????????????????????????????
---   Egy új project inditásakor érdemes frissíteni gépünkön az angulárt, hogy mindíg a legfrissebb verzióval hozzuk létre.
npm i -g @angular/cli
??????????????????????????????????????????????????????????????????????????????
---   NEW PROJECT  létrehozása   ---
ng new ang-customer2
y
y
scss
.....................
dir
cd ang-customer2                            enter
code . -r
..............................................................................................
Készíteka githubon egy új repot  NEW
ang-customer2
..............................................................................................
--- Összekötöm a VSCode -t a githubbal
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/arpad58/ang-customer3.git
git push -u origin main
......................................................................................................
npm i
...................................
package.json  fájlban  "start": "ng serve -o",
...................................
npm i bootstrap
npm i font-awesome
node_modules  -fájlban bootstrap.min.css  relativ elérést kimásolni
és angular.json  fájlba beilleszteni a "styles" -ba
node_modules  -fájlban font-awesome.min.css  relativ elérést kimásolni
és angular.json  fájlba beilleszteni a "styles" -ba
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/font-awesome/css/font-awesome.min.css",
              "src/styles.scss"
            ],
................................................................................................................
npm start
.................................................................................................................
--- Ha a start sikeres, akkor csinálok egy commitot  start
...................................................................................................................
---   NAVBAR
ng g c common/navbar
---- Navbar elhelyezése az app.component.html oldalon
<app-navbar></app-navbar>
----- Alatta a router-outletet betettem egy container divbe
<div class="container">
  <div class="row">
    <div class="col-12">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
...........................................................................................................
----  Navbar létrehozása a navbar.component.html -ben
b4-navbar-default
---- hrefet átírni
routerLink="">Customer List</a>
routerLink="">New Customer</a>
............................................................................................................
----  customer osztály létrehozása
ng g class model/customer
.....................
export class Customer {
  id: number = 0;
  name: string = '';
  email: string = '';
  rating: number = 0;
  address: string = '';
}............................................................................................................
???????????????????????????????????????
----  server mappa létrehozása src mellé
..............................................
---- list.json fájl létrehozása a server mappába
--elérése majd ez lesz
json-server -w./server/list.json
json-server ./server/list.json -w
...............................................
--- lista elkészítése mockaroo.com   -on.
--- bemásolni a list.json fájlba tömbként []
{
"customers": []
}
?????????????????????????????????????????
...............................................................................................................
--- customer-list oldal létrehozása   
ng g c page/customer-list
............................
--- customer-list oldal beállitása a app.routing.module.ts   -ben
{
    path: '',
    component: CustomerListComponent,
  },
{
    path: '**',
    component: CustomerListComponent,
  },
......................................................................
--- Táblázat létrehozása a customer-list.component.html -ben
--container  row  col   és bele    b4-table-default  
---  Ekkor megjelenik az üres táblázat a böngészőben  ---
.....................................................................
--- thead  -et kitölteni az oszlop nevekkel a customer.ts osztály alapján. Ekkor látszik a fejléc a böngészőben
<thead>
           <tr>
             <th>#</th>
             <th>Name</th>
             <th>Email</th>
             <th>Rating</th>
             <th>Address</th>
             <th></th>
           </tr>
         </thead>
..............................................................................................................
--- app.module.ts -be beimportálni a HttpClientModule
import { HttpClientModule } from '@angular/common/http';
--- Az importok közés is beirni
HttpClientModule,
------  Szükséges lehet a npm start  újraindítás.
..................................................................................................................
--- customer.service   -t   létrehozni
ng g service service/customer
............. és
--- HttpClient  -t beinjektálni a construktorba
--- és létrehozni a getAll metódust
--- és megadni a serverAddress állandót
.............
export class CustomerService {
  serverAddress: string = 'https://nettuts.hu/jms/arpad58/customers';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.serverAddress}`);
  }
}
...........................................................................................................................
--- customer-list.component.ts  -be a  beirni a customerList$ -t 
--- és a constructorba beinjektálni a customerServicé -t 

export class CustomerListComponent implements OnInit {
  customerList$: Observable<Customer[]> = this.customerService.getAll();

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
  }
}
...............................................................................................................................
?????????????????????????????????????????????
---   Elindítani a json-server -t
json-server ./server/list.json -w
???????????????????????????????????????????????
...............................................................................................................................
--- customer-list.component.html -be kitölteni a tbody  -t
<tbody>
          <tr *ngFor="let customer of customerList$ | async">
            <td>{{customer.id}}</td>
            <td>{{customer.name}}</td>
            <td>{{customer.email}}</td>
            <td>{{customer.rating}}</td>
            <td>{{customer.address}}</td>
           </tr>
        </tbody>
......................................................................................................
----- Táblázat működik -------
.........................................................................................................
TABLE -- TABLE -- TABLE -- TABLE -- TABLE - -TABLE -- TABLE -- TABLE -- TABLE --
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- 
................................................................................................................
---   DELETE gomb és funkció
--- delete gomb a customer-list.component.html  -be
           <td>       <!-- (click)="onDelete(customer)" később beilleszteni-->
              <button (click)="onDelete(customer)"  class="btn btn-danger">
                <i class="fa fa-trash"></i>
              </button>
            </td>
.....................................................................
--- delCustomerr metódus a customerr.service.ts  -be
    delCustomer(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.serverAddress}/${customer.id}`);
  }
.....................................................................
--- onDelete metódus a customer-list.component.ts  -be 
 alerttel ezt be kell szúrni első sorba:    alert('Are you sure you want to delete?');

onDelete(customer: Customer): void {

    this.customerService.delCustomer(customer).subscribe(
      () => {
         this.customerList$ = this.customerService.getAll();
       }
    );
  }
...........................................................................
--- click esemény beillesztése a customer-list.component.html -be  a delete gombra
<button (click)="onDelete(customer)" class="btn btn-danger">
       <i class="fa fa-trash"></i>
 </button>
...................................................................................................................
DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- DELETE -- 
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
editor-create-save -- editor-create-save -- editor-create-save -- 
..............................................................................................................................
--Létrehozni az editor oldalt.
ng g c page/customer-editor
.......................................................................................
---  app.module.ts -be beimportálni a Forms.Modulet 
import { FormsModule } from '@angular/forms';
---  app.module.ts -be beimportálni a ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
.........................................................................................
---  app.routing.module.ts -ben beállítani az editor oldalt másodiknak 
{
    path: 'customer-editor',
    component: CustomerEditorComponent,
  },
.....................................................................................
navbar.component.html -be beirni a linkelést
routerLink="/customer-editor"
......................................................................................
---  customer.list.component.html -ben létrehozni a tbody -ba a táblázat fölé egy + gombot ami átvisz routinggal az editor oldalra
      <button [routerLink]="['/customer-editor']" class="btn btn-primary btn-block">
        <i class="fa fa-plus"></i>
      </button>
--- Erre kattintva már átvisz az editor oldalra ami még üres
.........................................................................................
---  customer.service .ts -be létrehozni a get metódust  ami id -re működik
get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.serverAddress}/${id}`);
  }
..........................................................................................
---  customer-editor.component.ts -be   construktorba beinjektálni
constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
.......................
---  customer-editor.component.ts -be  
newCustomer: Customer = new Customer();
......................................................................................
---  customer-editor.component.html -be létrehozni a form -ot.
container  row  col   és bele    
<form></form>
.........
b4-form-input   -tal a sorokat létrehozni
.........
<div class="container">
  <div class="row">
    <div class="col-6 offset-3">
      <h2>Create New Customer</h2>
      <form #customerForm="ngForm">
         <div class="form-group">
            <label for="">Name</label>
            <input type="text"
               class="form-control"
               name="name">
             </div>
          <div class="form-group">
            <label for="">Email</label>
            <input type="text"
               class="form-control" 
               name="email">
             </div>
          <div class="form-group">
            <label for="">Rating</label>
            <input type="text"
               class="form-control" 
               name="rating">
          </div>
          <div class="form-group">
            <label for="">Address</label>
            <input type="text"
               class="form-control" 
               name="address">
             </div>
          <div class="form-group">
            <!-- save button create -->
            <button  type="submit" class="btn btn-primary btn-block mt-1">
              <i class="fa fa-save"></i>
            </button>
          </div>
      </form>
    </div>
  </div>
</div>
................................................................................................................................
--- EDITORBAN CREATE és SAVE ---
---  customer.service .ts -be létrehozni a createCustomer metódust  ami customer -re működik
createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.serverAddress}`, customer);
  }
..........................................................................................
---  customer-editor.component.ts -be  létrehozni a onCreate metódust
  onCreate(customer: Customer): void {
    this.customerService.createCustomer(customer).subscribe(
      () => this.router.navigate(['/'])
    );
  }
.......................................................................................
---  customer-edritor.component.html -be létrehozni MENTÉS gombot alulra a táblázat végére
<div class="form-group">
            <!-- save button create -->
            <button [disabled]="customerForm.invalid"   type="submit" class="btn btn-primary btn-block mt-1">
              <i class="fa fa-save"></i>
            </button>
          </div>
.... a validáció sikertelen esetén ne működjön akkor
<button [disabled]="customerForm.invalid" 
..........................................................................................
---  customer-editor.component.html -be beirni a FORM sorába 
(ngSubmit)="onCreate(newCustomer)"
...........................
Az inputokhoz beirni
<input [(ngModel)]="newCustomer.name"
<input [(ngModel)]="newCustomer.email"
<input [(ngModel)]="newCustomer.rating"
<input [(ngModel)]="newCustomer.address"
..............................................................................................................................
NEW USER FELVITELE MŰKÖDIK
.............................................................................................................................
editor-create-save -- editor-create-save -- editor-create-save -- 
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
update-save -- update-save -- update-save -- update-save -- update-save -- 
..............................................................................................................................
--Létrehozni az editor oldalt az update részére.
ng g c page/customer-update
.......................................................................................
---  app.module.ts -be beimportálni a Forms.Modulet 
import { FormsModule } from '@angular/forms';
---  app.module.ts -be beimportálni a ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
.........................................................................................
---  app.routing.module.ts -ben beállítani az editor oldalt másodiknak id alapján
{
    path: 'customer/:id',
    component: CustomerUpdateComponent,
  },
......................................................................................
---  customer.list.component.html -ben létrehozni a tbody -ba a sor végére egy editor gombot
       <div>
        <button [routerLink]="['/customer-editor']" class="btn btn-success btn-block">
          <i class="fa fa-plus"></i>
        </button>
      </div>
--- Erre kattintva már átvisz az editor oldalra ami még üres
.........................................................
---  customer-update.component.html -be létrehozni a form -ot.
container  row  col   és bele    
<form></form>
.........
b4-form-input   -tal a sorokat létrehozni
.........
<div class="container">
  <div class="row">
    <div class="col-6 offset-3">
      <h2>Update Customer</h2>
      <form #customerForm="ngForm" >
        <div class="form-group">
          <label for="">Name</label>
          <input type="text"
            class="form-control" name="name">
        </div>
        <div class="form-group">
          <label for="">Emaile</label>
          <input type="text"
            class="form-control" name="email">
        </div>
        <div class="form-group">
          <label for="">Rating</label>
          <input type="text"
            class="form-control" name="rating">
        </div>
        <div class="form-group">
          <label for="">Address</label>
          <input type="text"
            class="form-control" name="address">
        </div>
        <div class="form-group">
          <!-- save button  update -->
          <button  type="submit" class="btn btn-primary btn-block mt-5">
            <i class="fa fa-save"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
.............
---  customer.service .ts -be létrehozni a get metódust  ami id -re működik
get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.serverAddress}/${id}`);
  }
...........................
---  customer-update.component.ts -be  construktorba beinjektálni a CustomerService -t 
--- és az ActivatedRoute -t    és a Routert
constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
     private router: Router
  ) { }
....................................
---  customer-update.component.ts -be  
customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => {
            return this.customerService.get(Number(params.id));
    })
  );
...................
felülre beimportálni
import { switchMap } from 'rxjs/operators';  
import { NgForm } from '@angular/forms'; 
...........................
---  customer-update.component.html -be  a col sorba beirni felülre
*ngIf="customer$ | async as customer"
<div class="col-6 offset-3" *ngIf="customer$ | async as customer" >
........
---  Az inputokhoz beirni
<input [(ngModel)]="customer.name"
<input [(ngModel)]="customer.email"
<input [(ngModel)]="customer.rating"
<input [(ngModel)]="customer.address"
.........................Ekkor az adatok látszanak a kiválasztott productra-------------

---  customer.service.ts -be létrehozni az updateCustomer metódust
updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.serverAddress}/${customer.id}`, customer);
  }
...............................................................................

---  customer-update.component.ts -be   létrehozni mentés gombhoz az onSubmit metódust
onSubmit(form: NgForm, customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      () => this.router.navigate(['/'])
    );
  }
............................................
---  customer-update.component.html -be  a form sorba beirni a onSubmitot
(ngSubmit)="onSubmit(customerForm, customer)"
<form #customerForm="ngForm" (ngSubmit)="onSubmit(customerForm, customer)">
---------  Editor működik  --------------------------------------------------------
update-save -- update-save -- update-save -- update-save -- update-save -- 
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
validation create update -- validation create update -- validation create update -- 
.......................................................................................................................


---   customer.editor.component.html -be és a
customer-update.component.html beirni az inputba
<!-- Name Validation: min 8 char, max 40 char, required -->
pattern=".{8,40}" required
...........
--- és ha meg akarjuk jeleníteni az error szövegét, akkor egy új divet is be kell tenni az input alá 
<div [hidden]="customerForm.controls.name?.valid || customerForm.controls.name.pristine" class="error-message">
                Minimum 8 characters, maximum 40 characters.
              </div>
............
---  ha azt akarjuk, hogy az error szövege piros legyen és dőlt akkor az scss -be az alábbit beirni
.error-message {
   color: red;
   font-style: italic;
 }
....................................
<!-- Email  Validation: valid email, required. -->
pattern="^.{3,}@{1}.{3,}\.{1}[a-z]{2,}$" required
...
<div [hidden]="customerForm.controls.email?.valid || customerForm.controls.email.pristine" class="error-message">
                Invalid email address.
              </div>
......................................................
<!-- Rating   Kötelező kitölteni, csak számok 1 - 5, legalább 1 karakter, maximum 1 karakter. -->
pattern="[1-5]{1,1}" required
......
<div [hidden]="customerForm.controls.rating?.valid || customerForm.controls.rating.pristine" class="error-message">
                Minimum 1 character. Maximum 1 character. Numbers only 1 - 5.
              </div>
................................................
<!-- Address  Validation: min 8 char, max 40 char, required -->
pattern=".{8,40}" required
<div [hidden]="customerForm.controls.address?.valid || customerForm.controls.address.pristine" class="error-message">
                Minimum 8 characters, maximum 40 characters.
              </div>
................................................................................................................
.... a validáció sikertelen esetén ne működjön akkor
<button [disabled]="customerForm.invalid" 
............................................................................................................................
validation -- validation -- validation -- validation -- validation -- validation -- 
...........................................................................................
                                        ---      Feladat  kész     -----
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                                                    Kiegészítés
FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- 
 ......................................................................................................................
---  Filter szűrés minden oszlopra és name -re
-- filter pipe generálása
ng g pipe pipe/filter
...............................
---  filter.pipe.ts  -be beíni
export class FilterPipe implements PipeTransform {
  transform(value: null | any[], phrase: string, key: string): any[] | null {
    if (!Array.isArray(value) || !phrase || !key) {
      return value;
    }
    phrase = ('' + phrase).toLowerCase();
    return value.filter(item => {
      const strItem: string = ('' + item[key]).toLowerCase();
      return strItem.includes(phrase);
    });
  }
}
.........................................................
---  customer.list.component.ts-be beírni  phrase állandót és az onFilterPhrase metódust
phrase: string = '';
.....................
onFilterPhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
.......................................................................
---  customer.list.component.html  -be létrehozni egy input beviteli mezőt
<div>
      <input
        (keyup)="onFilterPhrase($event)"
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
</div>
..........................
---  customer.list.component.html  -be az ngFor  -os sort kiegészíteni az async után 
<tr *ngFor="let customer of customerList$ | async | filter: phrase: 'name'">
................................................................................
FILTER MŰKÖDIK
............................................................................................................................
FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- FILTER -- 
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- 
..............................................................................................................................
---  sorter pipe generálása
ng g pipe pipe/sorter
.....................
export class SorterPipe implements PipeTransform {
  transform(value: null | any[], key: string, direction: number): any[] | null {
    if (!Array.isArray(value) || !key) {
      return value;
    }
    return value.sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return direction * (a[key] - b[key]);
      }
      const aString: string = ('' + a[key]).toLowerCase();
      const bString: string = ('' + b[key]).toLowerCase();
      return direction * aString.localeCompare(bString);
    });
  }
}
.....................................................................................................................
---  customer.list.component.ts  -be létrehozni az állandókat és OnColumn Select metódust
direction: number = 1;
 columnKey: string = '';
.............
constructor(private customerService: CustomerService) { }
.............
onColumnSelect(key: string): void {
    if (this.columnKey === key) {
      this.direction = this.direction * -1;  /* -1 esetén  */     /*  1 esetén  */     /*  1 esetén  */
    } else {                           /* NÖVEKVŐ és CSÖKKENŐ*/    /* NÖVEKVŐ */    /* CSÖKKENŐ  */                          
      this.direction = 1;                              /*  1 esetén  */    /*  1 esetén  */     /*  -1 esetén  */
    }
    this.columnKey = key;
  }
.........................................................................................................
---  customer.list.component.html  -be beírni a click eseményt és az ngFor -hoz a sorter pipet
<thead>
          <tr>   <!--    sorter            --> <!-- table -->
            <th (click)="onColumnSelect('id')">#</th>
            <th (click)="onColumnSelect('name')">Name</th>
            <th (click)="onColumnSelect('email')">Email</th>
            <th (click)="onColumnSelect('rating')">Address</th>
            <th (click)="onColumnSelect('address')">Active</th>
          </tr>
        </thead>
        <tbody>
              <!--    table                     --> <!--    sorter          --><!--    filter          -->
          <tr *ngFor="let customer of customerList$ | async | sorter: columnKey:direction | filter: phrase: 'name'">
            <td>{{ user.id }}</td>        <!-- table -->
            <td>{{ user.name }}</td>      <!-- table -->
            <td>{{ user.email }}</td>     <!-- table -->
            <td>{{ user.rating }}</td>   <!-- table -->
            <td>{{ user.address }}</td>    <!-- table -->
          </tr>
        </tbody>
..............................................................................................................................
SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- SORTER -- 
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
npm start
json-server -w./server/list.json
json-server ./server/list.json -w
ng build --prod
