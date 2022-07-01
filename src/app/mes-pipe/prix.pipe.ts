import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix'
})
export class PrixPipe implements PipeTransform {

  transform(prix: number): string {
    var tableauDixaine = []
    while(prix > 100) {
      if(Math.floor(prix%1000) >= 0)
        tableauDixaine.unshift('000');
      else
        tableauDixaine.unshift(Math.floor(prix%1000));
      prix = prix / 1000;
    }
    tableauDixaine.push(prix)
    if(parseInt(prix.toString()) > 0)
      tableauDixaine.unshift(Math.floor(prix));
    return tableauDixaine.join(" ").toString();
  }

}
