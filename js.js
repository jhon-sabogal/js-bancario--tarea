class CuentaBancaria {
constructor(titular, saldoInicial = 0) {
    if (typeof saldoInicial !== "number" || isNaN(saldoInicial) || saldoInicial < 0) {
        throw new Error("El saldo inicial debe ser un número mayor o igual a cero.");
    }

    this._titular = titular;
    this._saldo = saldoInicial;
    this._historialMovimientos = [];

    if (saldoInicial > 0) {
        this.registrarMovimiento("Saldo inicial", saldoInicial);
    }
}


validarMonto(monto) {
    if (typeof monto !== "number" || isNaN(monto) || monto <= 0) {
        throw new Error("El monto debe ser un número mayor a cero.");
    }
}

registrarMovimiento(tipo, monto) {
    this._historialMovimientos.push({
        tipo: tipo,
        monto: monto,
        saldoResultante: this._saldo,
        fecha: new Date(),
    });
}

consultarSaldo() {
    return this._saldo;
}

depositar(monto) {
    this.validarMonto(monto);
    this._saldo += monto;
    this.registrarMovimiento("Depósito", monto);
    return this._saldo;
}

retirar(monto) {
    this.validarMonto(monto);
    if (monto > this._saldo) {
        throw new Error("Fondos insuficientes: no se puede retirar más de lo que hay.");
    }
    this._saldo -= monto;
    this.registrarMovimiento("Retiro", monto);
    return this._saldo;
}

consultarHistorial() {
    return [...this._historialMovimientos];
}

get titular() {
    return this._titular;
}
}



const cuenta = new CuentaBancaria("Ana Pérez", 1000);
console.log("Saldo:", cuenta.consultarSaldo());
cuenta.depositar(500);
console.log("Saldo:", cuenta.consultarSaldo());
cuenta.retirar(200);
console.log("Saldo:", cuenta.consultarSaldo());

try {
    cuenta.retirar(5000);
} catch (e) {
    console.log("Error:", e.message);
}

try {
    cuenta.depositar(-50); 
} catch (e) {
    console.log("Error:", e.message);
}

console.log("Historial:", cuenta.consultarHistorial());

const cuentaVacia = new CuentaBancaria("Luis Gómez");
console.log("Saldo cuenta vacía:", cuentaVacia.consultarSaldo());