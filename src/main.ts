import  Endereço  from "./domain/valueObjects/address";
import { CustomError } from "./error/customError";

function main(){

    const address = Endereço.create(
        "Rua dos Bobos",
        "",
        "São Paulo",
        "SP",
        ""
      );

      console.log(address)
      
}
main()