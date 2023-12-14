import { Product } from "@/interfaces/Product"

const productValidation = (product: Product) => {
    
    const validatePrice = /^([0-9])*$/;

    const errors: Product = {
        title:"",
        description: "",
        price:"",
        image:""
    };

    if (product.title && (product.title.length < 3 || product.title.length > 20)) {
        errors.title = '*The product name must be between 3 and 25 characters';
    } 

    if (product.description && product.description.length > 100) {
        errors.description = '*The description must be less than 100 characters';
    }

    if (product.price && !validatePrice.test(product.price)) {
        errors.price =
        '*The price must contain only numbers';
    }

    return errors;
    };

    export default productValidation