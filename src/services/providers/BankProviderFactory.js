import { BANK_MAPPER } from "../../utils/bankMapper.js";
import { NationalBankProvider } from "./banks/nationalBankProvider.js";
/* TODO: This switch case is a temporary implementation until full bank integration.
  Once integrated, this will be refactored to use dynamic binding (Dependency Injection) 
  to resolve providers dynamically and improve the overall logic for better scalability.
*/
export const BankProviderFactory = {
  get(bank_id) {
   const keyProvider=BANK_MAPPER[bank_id];
    switch (keyProvider) {
      case "NATIONAL_BANK":
        return new NationalBankProvider();

     /* case "BANQUE_MISR":
        return new BanqueMisrProvider();
        */
      default:
        throw new Error("Unsupported bank provider");
    }
  }
};