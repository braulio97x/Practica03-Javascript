
//Validacion que todos los campos tengan algun atributo 

function validarCamposObligatorios() {
    var bandera = true;
    //obtenemos todos los formularios de la pagina y tomamos 
    //cada elemento del formulario
    for(var i = 0; i < document.forms[0].elements.length; i++){
        var elemento = document.forms[0].elements[i];
        
        if(elemento.value == '' && elemento.type == 'text'){
            
            switch (elemento.id) {
            case 'cedula':
                //si falta la cedula se desplega esto
                document.getElementById('mensajeCedula').innerHTML = 'La cedula esta vacia';
                break;
            case 'nombres': 
                //si falta la nombres se desplega esto
                document.getElementById('mensajeNombres').innerHTML = 'Los campos nombres esta vacio';
                break;
               
            case 'apellidos': 
                //si falta la Apellidos se desplega esto
                document.getElementById('mensajeApellidos').innerHTML = 'Los campos apellidos esta vacio';
                break;
            case 'direccion': 
                //si falta la direccion se desplega esto
                document.getElementById('mensajeDireccion').innerHTML = 'El campo direccion esta vacio';
                break;
            case 'telefono': 
                //si falta el telefono se desplega esto
                document.getElementById('mensajeTelefono').innerHTML = 'El campo telefono esta vacio';
                break;
            case 'fechaNacimiento': 
                //si falta el telefono se desplega esto
                document.getElementById('mensajeFecha').innerHTML = 'El campo fecha de Nacimiento esta vacia';
                break;  
            case 'correo': 
                //si falta el telefono se desplega esto
                document.getElementById('mensajeCorreo').innerHTML = 'El campo correo electronico esta vacio';
                break; 
            case 'contrasena': 
                //si falta el telefono se desplega esto
                document.getElementById('mensajePW').innerHTML = 'El campo contraseña esta vacio';
                
                break;     
                
            default:
                console.log('default');
            }
            
            elemento.style.border = '1px red solid';
            elemento.className = 'error';
            bandera = false;
        }
    }

    if(!bandera){
        alert('Error: revisar los comentarios');
        return false;
    }else{
        return true;
    }
    
}

//funcion para validar el ingreso solo de letras

function validarLetras(elemento) {
    var miAscii = '';
    var letrasVal = '';
    var valorCadena = "";

    elemento.value = elemento.value.trim();
    valorCadena = elemento.value.trim() + " ";

    if(elemento.value.length > 0){
        for (var i = 0; i < elemento.value.length; i++) {
            miAscii = elemento.value.charCodeAt(i);
            if((miAscii >= 97 && miAscii <= 122) || (miAscii === 32) || (miAscii >= 65 && miAscii <= 90)){
               
            }else {
                letrasVal = valorCadena.substring(0, i) + valorCadena.substring(i+1, elemento.value.length);
                elemento.value = letrasVal; 
            }
        }
    }else{
        return true;
    }
} 

//funcion para validar el ingreso solo de numeros

function validarNumeros(elemento) {
    var miAscii = '';
    var letrasVal = '';
    var numVal = '';
    var valorCadena = "";

    elemento.value = elemento.value.trim();
    valorCadena = elemento.value.trim() + " ";

    if(elemento.value.length > 0){
        for (var i = 0; i < elemento.value.length; i++) {
            miAscii = elemento.value.charCodeAt(i);
            if(miAscii >= 48 && miAscii <= 57){
               
            }else {
                numVal = valorCadena.substring(0, i) + valorCadena.substring(i+1, elemento.value.length);
                elemento.value = numVal; 
            }
        }
    }else{
        return true;
    }
}


function dividirCadenas (elemento, id) {
    //obtenemos los elementos separados por espacioi
    var arrayDeCadenas =  elemento.value.trim().split(" ");
    //Validamos que la cadena conste con dos elementos separados por un espacio 
    if(arrayDeCadenas.length === 2){
        document.getElementById(id).innerHTML = 'Datos Correctos';
        document.getElementById(id).style.color = '#4C0080';
        return true
    }else{
        elemento.value = "";
        if (id === 'mensajeNombres'){
            document.getElementById(id).innerHTML = 'ingresar dos nombres completos por favor';
        }
        
        if (id === 'mensajeApellidos'){
            document.getElementById(id).innerHTML = 'ingresar dos apellidos completos por favor';
        }
        return false;
    }   
 }


/**
 * funcion para validar la longuitud de la cedula:  validacion en base al último dígito verificador.
 * 
 * 1.- Se debe validar que tenga 10 numeros
 * 2.- Se extrae los dos primero digitos de la cedula y compruebo que existan las regiones
 * 3.- Extraigo el ultimo digito de la cedula y el tercer digito debe ser menor a 6
 * 4.- Extraigo Todos los pares y los sumo
 * 5.- Extraigo Los impares los multiplico x 2 si el numero resultante es mayor a 9 le restamos 9 al resultante
 * 6.- Extraigo el primer Digito de la suma (sumaPares + sumaImpares)
 * 7.- Conseguimos la decena inmediata del digito extraido del paso 6 (digito + 1) * 10
 * 8.- restamos la decena inmediata - suma / si la suma nos resulta 10, el decimo digito es cero
 * 9.- Paso 9 Comparamos el digito resultante con el ultimo digito de la cedula si son iguales todo OK sino existe error.     
*/


function validacionCedula(elemento){

    //instancia de variables
    var numeroProviancias = 24;  
    var tercerdigito = 6;  
    var provincia = 0;
    var digitoTres= 0;
    var pares = 0;
    var numero1 = 0;
    var numero3 = 0;
    var numero5 = 0;
    var numero7 = 0;
    var numero9 = 0;
    var impares = 0;
    var suma_total = 0;
    var primer_digito_suma = 0;
    var decena = 0;
    var digito_validador = 0;
    var ultimo_digito = 0;

    if(elemento.value.length > 10){
        elemento.value = elemento.value.substring(0, 10);
        document.getElementById('mensajeCedula').innerHTML = 'La cedula no puede contener mas de 10 digitos';
        console.log("perrrrrro");
        return false;
        
    }else{
        
        //Obtenemos el numero de la caja de texto 
        provincia = parseInt(elemento.value.charAt(0)+""+elemento.value.charAt(1)); 
        digitoTres = parseInt(elemento.value.charAt(2) + "");  

        if ((provincia > 0 && provincia <= numeroProviancias) && digitoTres < tercerdigito) {  
            
            
            //Agrupo todos los pares y los sumo
            pares = parseInt(elemento.value.substring(1,2)) + parseInt(elemento.value.substring(3,4)) + parseInt(elemento.value.substring(5,6)) + parseInt(elemento.value.substring(7,8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            numero1 = elemento.value.substring(0,1);
            numero1 = (numero1 * 2);
            if( numero1 > 9 ){ 
                numero1 = (numero1 - 9); 
            }

            numero3 = elemento.value.substring(2,3);
            numero3 = (numero3 * 2);
            if( numero3 > 9 ){ 
                numero3 = (numero3 - 9); 
            }
            
            numero5 = elemento.value.substring(4,5);
            numero5 = (numero5 * 2);
            if( numero5 > 9 ){ 
                numero5 = (numero5 - 9); 
            }
  
            numero7 = elemento.value.substring(6,7);
            numero7 = (numero7 * 2);
            if( numero7 > 9 ){ 
                numero7 = (numero7 - 9); 
            }
  
            numero9 = elemento.value.substring(8,9);
            numero9 = (numero9 * 2);
            if( numero9 > 9 ){ 
                numero9 = (numero9 - 9); 
            }

            impares = numero1 + numero3 + numero5 + numero7 + numero9;

             //Suma total
            suma_total = (pares + impares);

            //extraemos el primero digito
            primer_digito_suma = String(suma_total).substring(0,1);

            //Obtenemos la decena inmediata
            decena = (parseInt(primer_digito_suma) + 1)  * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if(digito_validador == 10){
                var digito_validador = 0;
            }

            // Extraigo el ultimo digito
            ultimo_digito   = elemento.value.substring(9,10);

             //Validamos que el digito validador sea igual al de la cedula
            console.log("ultimo digito" + ultimo_digito);
            console.log("digito validador " + digito_validador);
            

            if(digito_validador == ultimo_digito){
                document.getElementById('mensajeCedula').innerHTML = 'La cedula es correcta';
                document.getElementById('mensajeCedula').style.color = '#4C0080';
                return true
            }else{
                elemento.value = elemento.value.substring(0, 10);
                document.getElementById('mensajeCedula').innerHTML = 'La cedula es incorrecta, modificar';
                return false;
            }            
        }  else{
            elemento.value = elemento.value.substring(0, 10);
            document.getElementById('mensajeCedula').innerHTML = 'La cedula es erronea, modificar';
            return false;
        }       
    }
}



function numeroTelefono(elemento){
  
    if((elemento.value.length === 10) || (elemento.value.length === 7)){
        console.log("telefono correcto ");
        document.getElementById('mensajeTelefono').innerHTML = 'Telefono correcto';
        document.getElementById('mensajeTelefono').style.color = '#4C0080';
        return true;
    }else{
        elemento.value = "";
        document.getElementById('mensajeTelefono').innerHTML = 'El telefono debe constar de 10 numeros para moviles o 7 para fijos';
        return false;
        
    }
}

//Validacion de Fecha de Nacimiento 


function validacionCaracteresFecha(elemento){
    
    if(elemento.value.length > 0){
        var miAscii = elemento.value.charCodeAt(elemento.value.length-1);

        if(miAscii >= 47 && miAscii <= 57){
            return true;
        }else {
            elemento.value = elemento.value.substring(0, elemento.value.length-1);
            return false;
        }
    }else{
        return true
    }
}


function validacionFechaNacimiento(elemento){
    
    var fecha = elemento.value.trim().split("/"); 
    var dia =fecha[0];        
    var mes = fecha[1];        
    var anio = fecha[2];  
    var dmax;

    if ((dia.length == 2) && (mes.length == 2) && (anio.length == 4)) {   

        if((mes <= 12 && mes >=1) && (anio >= 1000 && anio <=3000)){
            switch (parseInt(mes)) {        
                case 1:
                    dmax = 31;break;        
                case 2: 
                    //para saber si el anio es bisiesto o no utilizamos modulo
                    if (anio % 4 == 0) {
                        dmax = 29;
                    }else{ 
                        dmax = 28
                    };        
                    break;        
                case 3:
                    dmax = 31;break;        
                case 4:
                    dmax = 30;break;        
                case 5:
                    dmax = 31;break;        
                case 6:
                    dmax = 30;break;        
                case 7:
                    dmax = 31;break;        
                case 8:
                    dmax = 31;break;        
                case 9:
                    dmax = 30;break;        
                case 10:
                    dmax = 31;break;       
                case 11:
                    dmax = 30;break;      
                case 12:
                    dmax = 31;break;       
            }  

            if(dia > 0 && dia < dmax ){
                console.log("fecha correcta")
                document.getElementById('mensajeFecha').innerHTML = 'fecha correcta';
                document.getElementById('mensajeFecha').style.color = '#4C0080';
            }else{
                document.getElementById('mensajeFecha').innerHTML = 'El dia no coincide con la fecha puesta';
            }
        }else{
            document.getElementById('mensajeFecha').innerHTML = 'Mes o año mal ingresados';
        }
    } else{ 
        document.getElementById('mensajeFecha').innerHTML = 'formato fecha mal ingresado /dd/mm/yyyy';
        return false;        
    }
}    



function validacionCorreo(elemento) {
    //Instancia de variables
    var posArroba = 0;
    var dominio = "ups.edu.ec";
    var dominioEst = "est.ups.edu.ec";
    var correo = "";
    var longuitudCorreo =0;

    //Comprobación de que tenemos una @ retorna -1 si no haya
    posArroba = elemento.value.indexOf('@');

    //Comprobacion de longuitud minima de correo
    longuitudCorreo = elemento.value.substring(0, posArroba);

    if((posArroba != -1) && (longuitudCorreo.length > 3)){
        correo = elemento.value.substring(posArroba + 1, elemento.value.length);
        console.log("correo "+correo)
        if ((dominio == correo)||(dominioEst == correo) ){
            document.getElementById('mensajeCorreo').innerHTML = 'Correo Valido';
            document.getElementById('mensajeCorreo').style.color = '#4C0080';
        }else{
            document.getElementById('mensajeCorreo').innerHTML = "No esta con el dominio correcto "+ dominio + " o "+dominioEst;
        }
    }else{
        if(posArroba === -1){
            document.getElementById('mensajeCorreo').innerHTML = "El correo debe contener @";
        }else{
            document.getElementById('mensajeCorreo').innerHTML = "La longitud es demasiada corta";
        }
    }
} 

function validacionCaracteresCorreo(elemento) {
    var miAscii = '';
    var correoVal = '';
    var cadenas;
    var valorCadena = "";

    elemento.value = elemento.value.trim();
    valorCadena = elemento.value.trim() + " ";

    if(elemento.value.length > 0){
        for (var i = 0; i < elemento.value.length; i++) {
            miAscii = elemento.value.charCodeAt(i);
            if((miAscii >= 48 && miAscii <= 57) || (miAscii >= 97 && miAscii <= 122) || (miAscii >= 64 && miAscii <= 90)||(miAscii ===46)){
               
            }else {
                correoVal = valorCadena.substring(0, i) + valorCadena.substring(i+1, elemento.value.length);
                elemento.value = correoVal; 
            }
        }
    }else{
        return true;
    }
} 

/**
 * Se debe validar que la contraseña ingresada tenga mínimo 8 caracteres,
    además, debe incluir al menos: una letra mayúscula, una letra minúscula
    y un carácter especial (@, _, $)
 */

function validacionContrasenia(elemento) {
    //Instancia de variables
    var posArroba = 0;
    var longuitudPaswd =0;
    var caracter = '';
    var uc,lc,nu,sc;
    var contUC = 0;
    var contLC = 0;
    var contNU = 0;
    var contSC = 0;
    //Comprobacion de long de pasword
    longuitudPaswd =elemento.value.length;

    if(longuitudPaswd > 8){
        for(var i=0; i<elemento.value.length; i++){
            caracter = elemento.value.charCodeAt(i);

            uc = isUpperCase(caracter);
            lc = isLowerCase(caracter);
            nu = isNumber(caracter);
            sc = isSpecialChar(caracter);

            if(uc === true){ contUC++;}
            if(lc === true){ contLC++;}
            if(nu === true){ contNU++;}
            if(sc === true){ contSC++;}
        }

        if((contUC > 0)&&(contLC >0)&&(contNU > 0)&&(contSC > 0) ){
            document.getElementById('mensajePW').innerHTML = 'Contraseña Valida';
            document.getElementById('mensajePW').style.color = '#4C0080';
        }else{
            document.getElementById('mensajePW').innerHTML = "La contraseña debe contener al menos una mayuscula, minuscula, numero y un caracter especial";
        }

    }else{
        document.getElementById('mensajePW').innerHTML = "La longitud de la contraseña es demasiada corta";
    }
}

function isUpperCase(caracter){
    if (caracter >= 65 && caracter < 91){
        return true;
    }else{
        return false;
    }
}

function isLowerCase(caracter){
    if (caracter >= 97 && caracter < 123){
        return true;
    }else{
        return false;
    }
}

function isNumber(caracter){
    if (caracter >= 48 && caracter < 58){
        return true;
    }else{
        return false;
    }
}

function isSpecialChar(caracter){
    if (caracter === 64 || caracter === 36 || caracter === 95){
        return true;
    }else{
        return false;
    }
}



function validacionCaracteresContrasenia(elemento) {
    var miAscii = '';
    var contrVal = '';
    var valorCadena = "";
    elemento.value = elemento.value.trim();
    valorCadena = elemento.value.trim() + " ";

    if(elemento.value.length > 0){
        for (var i = 0; i < elemento.value.length; i++) {
            miAscii = elemento.value.charCodeAt(i);
            if((miAscii >= 48 && miAscii <= 57) || (miAscii >= 97 && miAscii <= 122) || (miAscii >= 64 && miAscii <= 90)||(miAscii ===95)||(miAscii ===36)){
                
            }else { 
                elemento.value = "";
                document.getElementById('mensajePW').innerHTML = "Caracter especial invalido. Utilizar(@, _ , $)"; 
            }
        }
    }else{
        return true;
    }
} 