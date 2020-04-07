const https = require('https');

exports.calculate = async (event) => {
    let costo_salud_sin_hijos = 0.279;
    let costo_salud_un_hijos = 0.4396;
    let costo_salud_dos_hijos = 0.5599;

    let costo_dental_sin_hijos = 0.12;
    let costo_dental_un_hijos = 0.1950;
    let costo_dental_dos_hijos = 0.2480;
    
    let message = "";
    let url = "https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy"

    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, function(res) {
          res.on('data', chunk => {
            console.log("Leyendo la data");
            message += chunk;
          });
          res.on('end', () => {
            console.log("Procesando la data");

            let data = JSON.parse(message);
            
            let costo_total = 0;
            let costo_a_pagar = 0;
            let costo_por_empleado = [];
            
            let porcentaje_compania = data.policy.company_percentage;
            let tiene_cobertura_dental = data.policy.has_dental_care;

            data.policy.workers.map( function(worker) {
              let costo_empleado = 0;
              
              if(worker.childs === 0 && worker.age <= 65){
                costo_empleado = costo_salud_sin_hijos + ((tiene_cobertura_dental) ? costo_dental_sin_hijos : 0);
                costo_total = costo_total + costo_empleado;
              }
              else if(worker.childs === 1 && worker.age <= 65){
                costo_empleado = costo_salud_un_hijos + ((tiene_cobertura_dental) ? costo_dental_un_hijos : 0);
                costo_total = costo_total + costo_empleado;
              }
              else if(worker.childs > 1 && worker.age <= 65){
                costo_empleado = costo_dental_dos_hijos + ((tiene_cobertura_dental) ? costo_dental_dos_hijos : 0);
                costo_total = costo_total + costo_empleado;
              }
              
              costo_por_empleado.push(costo_empleado*((100-porcentaje_compania)/100));
            });

            costo_a_pagar=costo_total*(porcentaje_compania/100);

            let response = {};
            response.costo_empresa = costo_a_pagar; 
            response.costo_por_empleado = costo_por_empleado;

            resolve({
                statusCode: 200,
                body: JSON.stringify(response)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'La Url no responde'
          });
        });
    });
    
    return response;
};
