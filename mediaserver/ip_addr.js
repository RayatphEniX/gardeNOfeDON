var os = require('os');

function GetIpAddr() {
var interfaces = os.networkInterfaces();
// console.log(interfaces[0]);
// var addresses = [];
for (var k in interfaces) {
// k=1;
//   console.log(interfaces[k]);
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
//         console.log(address);

        if (address.family === 'IPv4' && !address.internal) {
//             addresses.push(address.address);
          return address.address;
        }
    }
}

}

module.exports=GetIpAddr;
// console.log(GetIpAddr());
// console.log(addresses);
