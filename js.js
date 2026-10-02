class CuentaBancaria {
  constructor(titular, saldoInicial = 0) {
    this._titular = titular;
    this._saldo = 0;
    this._historial = [];

    if (saldoInicial > 0) {
      this._saldo = saldoInicial;
      this._historial.push("Saldo inicial: +" + saldoInicial);
    } else if (saldoInicial < 0) {
      console.log("El saldo inicial no puede ser negativo. Se dejó en 0.");
    }
  }

  consultarSaldo() {
    return this._saldo;
  }

  depositar(monto) {
    if (typeof monto !== "number" || monto <= 0) {
      console.log("Error: el monto debe ser un número mayor a cero.");
      return false;
    }

    this._saldo = this._saldo + monto;
    this._historial.push("Depósito: +" + monto);
    console.log("Depósito exitoso. Saldo actual: " + this._saldo);
    return true;
  }

  retirar(monto) {
    if (typeof monto !== "number" || monto <= 0) {
      console.log("Error: el monto debe ser un número mayor a cero.");
      return false;
    }

    if (monto > this._saldo) {
      console.log("Error: no puedes retirar más de lo que hay. Saldo actual: " + this._saldo);
      return false;
    }

    this._saldo = this._saldo - monto;
    this._historial.push("Retiro: -" + monto);
    console.log("Retiro exitoso. Saldo actual: " + this._saldo);
    return true;
  }

  mostrarHistorial() {
    console.log("--- Historial de " + this._titular + " ---");
    if (this._historial.length === 0) {
      console.log("No hay movimientos todavía.");
    } else {
      for (let i = 0; i < this._historial.length; i++) {
        console.log((i + 1) + ". " + this._historial[i]);
      }
    }
  }
}


const cuenta = new CuentaBancaria("Ana Pérez", 1000);

cuenta.depositar(500);
cuenta.retirar(200);
cuenta.retirar(5000);   
cuenta.depositar(-50);  

console.log("Saldo final: " + cuenta.consultarSaldo());
cuenta.mostrarHistorial();

const cuentaVacia = new CuentaBancaria("Luis Gómez");
cuentaVacia.mostrarHistorial();