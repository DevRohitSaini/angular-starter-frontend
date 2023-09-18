import { Injectable } from "@angular/core";
import { Address } from "ngx-google-places-autocomplete/objects/address";

@Injectable({
    providedIn: 'root'
})
export class UtilsService { 
    
    autocompleteAddressByGoogle(address: Address) {
        let street = "";
        let postcode = "";
        let city = "";

        if (address.address_components && address.address_components.length) {
            for (const component of address.address_components) {
                const componentType = component.types[0];
    
                switch (componentType) {
                    case "street_number": {
                        street += ` ${component.long_name}`;
                        break;
                    }
    
                    case "route": {
                        street = `${component.long_name}${street}`;
                        break;
                    }
    
                    case "postal_code": {
                        postcode = component.long_name;
                        break;
                    }
    
                    case "locality": {
                        city = component.long_name;
                        break;
                    }
                }
            }

            street = street;
        }

        return [street, city, postcode];
    }
}